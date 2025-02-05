
from algopy import (
    ARC4Contract,
    Global,
    Txn,
    itxn,
    op,
    String, UInt64, Bytes, Approve, Reject, Seq, Condition,subroutine
)
from algopy.arc4 import abimethod, Address
class TurtleMonitor(ARC4Contract):
    """
    Esempio di contratto "arc4" (algopy/puya style) con assert invece di Condition/Seq.
    - 'admin' è salvato in Global State alla creazione
    - Ruoli 'creator' e 'modifier' sono gestiti con Box: es. box key "creator:<address>"
    """

    def on_create(self):
        """
        Alla creazione, salviamo admin = Txn.sender in Global State.
        """
        Global.put(b"admin", Txn.sender)
        return


    def on_update(self):
        op.reject()
        return

    def on_delete(self):
        op.reject()
        return

    # ----------------------------------------------------------------
    # 1) Metodi di "amministrazione" ruoli: add/remove Creator e Modifier
    # ----------------------------------------------------------------

    @abimethod
    def add_creator(self, new_creator: Address) -> None:
        admin = Global.get(b"admin")
        assert Txn.sender == admin, "Only admin can add creators"

        box_key = b"creator:" + new_creator.bytes
        op.Box.put(box_key, b"1")  # indica che new_creator è un 'creator'

    @abimethod
    def remove_creator(self, old_creator: Address) -> None:
        admin = Global.get(b"admin")
        assert Txn.sender == admin, "Only admin can remove creators"

        box_key = b"creator:" + old_creator.bytes
        op.Box.delete(box_key)

    @abimethod
    def add_modifier(self, new_modifier: Address) -> None:
        admin = Global.get(b"admin")
        assert Txn.sender == admin, "Only admin can add modifiers"

        box_key = b"modifier:" + new_modifier.bytes
        op.Box.put(box_key, b"1")

    @abimethod
    def remove_modifier(self, old_modifier: Address) -> None:
        admin = Global.get(b"admin")
        assert Txn.sender == admin, "Only admin can remove modifiers"

        box_key = b"modifier:" + old_modifier.bytes
        op.Box.delete(box_key)

    # ----------------------------------------------------------------
    # 2) Helper: check se sender è creator o modifier
    # ----------------------------------------------------------------
    @subroutine
    def is_creator(addr) -> bool:
        creator_box_key = b"creator:" + addr
        creator_val = op.Box.get(creator_box_key)
        return (creator_val == b"1")

    @subroutine
    def is_modifier(addr) -> bool:
        modifier_box_key = b"modifier:" + addr
        modifier_val = op.Box.get(modifier_box_key)
        return (modifier_val == b"1")

    # ----------------------------------------------------------------
    # 3) Creazione di un ASA (uovo) + registrazione "non_schiuso"
    # ----------------------------------------------------------------

    @abimethod
    def create_egg_nft(self, name: String, url: String) -> UInt64:
        """
        - Admin o un creator possono chiamare
        - Crea un NFT ASA
        - Salva in Box "egg:<asset_id>" = "non_schiuso" (stato iniziale)
        - Emette un log
        Ritorna asset_id creato
        """
        admin = Global.get(b"admin")
        is_admin = (Txn.sender == admin)
        is_creat = self.is_creator(Txn.sender)

        assert (is_admin or is_creat), "Not authorized to create"

        # 1) Creiamo l'ASA (NFT)
        itxn_result = itxn.AssetConfig(
            total=1,
            decimals=0,
            asset_name=name.bytes,
            url=url.bytes,
            manager=Global.current_application_address,
            reserve=Global.current_application_address,
            freeze=Global.current_application_address,
            clawback=Global.current_application_address,
        ).submit()

        created_asa_id = itxn_result.created_asset.id

        # 2) Registriamo lo stato iniziale ("non_schiuso") in Box
        egg_key = b"egg:" + op.itob(created_asa_id)
        # Mettiamo un blob di esempio (stato e magari campi futuri)
        # Per semplicità, scriviamo "state=non_schiuso"
        op.Box.put(egg_key, b"state=non_schiuso")

        # 3) Log
        log_str = b"Created EGG ASA=" + op.itob(created_asa_id) + b" state=non_schiuso"
        op.log(log_str)

        return created_asa_id

    # ----------------------------------------------------------------
    # 4) Aggiornamento dello stato di un egg (ASA)
    # ----------------------------------------------------------------
    @abimethod
    def update_egg_data(self, asa_id: UInt64, data_blob: String) -> None:
        """
        - Admin o 'modifier'
        - Sovrascrive la Box "egg:<asa_id>" con i nuovi dati.
        - 'data_blob' può essere un JSON che contiene {state, data_schiusura, gps, genealogia...}
        """
        # 1) Check ruoli (come prima)
        admin = Global.get(b"admin")
        is_admin = (Txn.sender == admin)
        is_mod = self.is_modifier(Txn.sender)
        assert (is_admin or is_mod), "Not authorized"

        # 2) Scrivi in Box
        egg_key = b"egg:" + op.itob(asa_id.uint64)
        op.Box.put(egg_key, data_blob.bytes)

        # 3) Log
        op.log(b"Update ASA=" + op.itob(asa_id.uint64) + b" => updated blob")
