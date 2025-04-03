
from algopy import (
    ARC4Contract,
    Global,
    Txn,
    itxn,
    op,
    String, UInt64,subroutine, Bytes, log, Asset
)
from algopy.arc4 import abimethod, Address


class TurtleMonitor(ARC4Contract):
    """
    Esempio di contratto "arc4" (algopy/puya style) con assert invece di Condition/Seq.
    - 'admin' è salvato in Global State alla creazione
    - Ruoli 'creator' e 'modifier' sono gestiti con Box: es. box key "creator:<address>"
    """

    def __init__(self) -> None:
        self.admin = Txn.sender.bytes

    

    # ----------------------------------------------------------------
    # 1) Metodi di "amministrazione" ruoli: add/remove Creator e Modifier
    # ----------------------------------------------------------------

    @abimethod
    def add_creator(self, new_creator: Address) -> None:
        assert Txn.sender.bytes == self.admin, "Only admin can add creators"

        box_key = b"creator:" + new_creator.bytes
        op.Box.put(box_key, b"1")  # indica che new_creator è un 'creator'

    @abimethod
    def remove_creator(self, old_creator: Address) -> None:
        assert Txn.sender.bytes == self.admin, "Only admin can remove creators"

        box_key = b"creator:" + old_creator.bytes
        op.Box.delete(box_key)

    @abimethod
    def add_modifier(self, new_modifier: Address) -> None:
        assert Txn.sender.bytes == self.admin, "Only admin can add modifiers"

        box_key = b"modifier:" + new_modifier.bytes
        op.Box.put(box_key, b"1")

    @abimethod
    def remove_modifier(self, old_modifier: Address) -> None:
        assert Txn.sender.bytes == self.admin, "Only admin can remove modifiers"

        box_key = b"modifier:" + old_modifier.bytes
        op.Box.delete(box_key)

    # ----------------------------------------------------------------
    # 2) Helper: check se sender è creator o modifier
    # ----------------------------------------------------------------
    @subroutine
    def is_creator(self, addr: Bytes) -> bool:
        creator_box_key = b"creator:" + addr
        value, has_value = op.Box.get(creator_box_key)  # destrutturiamo la tupla
        
        # Se non esiste la box, potresti decidere di restituire False
        # oppure confrontare value con b"" se preferisci.
        # Ad esempio:
        if not has_value:
            return False
        
        return (value == b"1")

    @subroutine
    def is_modifier(self, addr: Bytes ) -> bool:
        modifier_box_key = b"modifier:" + addr
        modifier_val, has_value = op.Box.get(modifier_box_key)

        
        # Se non esiste la box, potresti decidere di restituire False
        # oppure confrontare value con b"" se preferisci.
        # Ad esempio:
        if not has_value:
            return False
        
        return (modifier_val == b"1")

    # ----------------------------------------------------------------
    # 3) Creazione di un ASA (uovo) + registrazione "non_schiuso"
    # ----------------------------------------------------------------

    @abimethod
    def is_modifier_addr(self, check_addr: Address) -> bool:
        """
        Metodo ABI per controllare se 'check_addr' e' un modifier registrato.
        """
        return self.is_modifier(check_addr.bytes)

    @abimethod
    def is_creator_addr(self, check_addr: Address) -> bool:
        """
        Metodo ABI per controllare se 'check_addr' e' un creator registrato.
        """
        return self.is_creator(check_addr.bytes)

    @abimethod
    def create_egg_nft(self, name: String, url: String, data_blob: String) -> UInt64:
        """
        - Admin o un creator possono chiamare
        - Crea un NFT ASA
        - Salva in Box "egg:<asset_id>" = "non_schiuso" (stato iniziale)
        - Emette un log
        Ritorna asset_id creato
        """
        is_admin = (Txn.sender.bytes == self.admin)
        is_creat = self.is_creator(Txn.sender.bytes)

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
        op.Box.put(egg_key, data_blob.bytes)
        # 3) Log
        log_str = (
            b"Create ASA=" + op.itob(created_asa_id) +
            b" from=" +
            b" to=" + data_blob.bytes +
            b" initialURL=" + url.bytes
        )
        log(log_str)

        return created_asa_id

    @abimethod
    def update_egg_data(
        self,
        asa_id: UInt64, 
        new_url: String,  # Link alla nuova immagine
        data_blob: String # JSON o string con altre info (stato, date, ecc.)
    ) -> UInt64:
        """
        - Admin o 'modifier'
        - Riconfigura l'ASA cambiando 'url'
        - Sovrascrive la Box "egg:<asa_id>" con i nuovi dati (data_blob)
        - Emette un log
        """
        # 1) Check ruoli

        is_admin = (Txn.sender.bytes == self.admin)
        is_mod = self.is_modifier(Txn.sender.bytes)
        assert (is_admin or is_mod), "Not authorized to update"
        asset_to_update = Asset(asa_id)
        egg_key = b"egg:" + op.itob(asa_id)
        old_val, has_old = op.Box.get(egg_key)
            # Se la box esiste già, la cancelliamo così da "ricrearla" con la nuova lunghezza
        

        # 2) Esegui la reconfig dell'ASA: cambiamo 'url' in "new_url"
        #    Nota: se vuoi cambiare anche "assetName" o "metadataHash", fallo qui.
        itxn_result = itxn.AssetConfig(
            config_asset=asset_to_update, 
            url=new_url.bytes,
            manager=Global.current_application_address,  # ridichiari
            reserve=Global.current_application_address,  # se serve
            freeze=Global.current_application_address,   # se serve
            clawback=Global.current_application_address, # se serve
            # manager = Global.current_application_address,  # ridichiari se necessario
            fee=0
        ).submit()
        # Ora i wallet, vedendo il campo 'url' dell'asset, mostreranno la nuova immagine.

        # 3) Aggiorna i dati in Box (se vuoi conservare altre info: stato, date, ecc.)
        if has_old:
            op.Box.delete(egg_key)
        op.Box.put(egg_key, data_blob.bytes)

        # 4) Log
        log_str = (
            b"Update ASA=" + op.itob(asa_id) +
            b" from=" + old_val +
            b" to=" + data_blob.bytes +
            b" reconfigURL=" + new_url.bytes
        )
        log(log_str)
        return asa_id
