from collections.abc import Generator
import algopy
import pytest
from algopy import arc4, op
from algopy_testing import AlgopyTestContext, algopy_testing_context
from smart_contracts.turtle_eggs.contract import TurtleMonitor



@pytest.fixture()
def context() -> Generator[AlgopyTestContext, None, None]:
    """
    Inizializza un contesto di test Algopy (sandbox virtuale) 
    e lo restituisce per i test successivi.
    """
    with algopy_testing_context() as ctx:
        yield ctx


@pytest.fixture()
def contract(context: AlgopyTestContext) -> TurtleMonitor:
    """
    Istanzia il contratto TurtleMonitor e lo "registra" nel ledger di test.
    Restituisce l'oggetto Python del contratto.
    """
    # Crea istanza
    turtle_contract = TurtleMonitor()
    # Registriamo / deployamo nel ledger interno
    # In molti setup, semplicemente: 
    _ = context.ledger.get_app(turtle_contract)  
    # Se la libreria prevede una "deploy", la chiameresti qui.
    return turtle_contract



def test_add_creator(context: AlgopyTestContext, contract: TurtleMonitor) -> None:
    test_app = context.ledger.get_app(contract)

    # 1) Creo un account user1
    user1 = context.any.account()
    user1_str = arc4.String(str(user1))  # arc4.String

    # 2) Chiamo add_creator con l'admin di default (context.default_sender)
    contract.add_creator(new_creator=user1_str)

    # 3) Controllo la box
    box_key = b"creator:" + user1_str.bytes
    val = context.ledger.get_box(contract, box_key)
    assert val == b"1"

    # 4) Chiamo add_creator con un utente non admin => deve fallire
    user2 = context.any.account()
    with context.txn.create_group(active_txn_overrides={"sender": user2}):
        with pytest.raises(Exception):
            contract.add_creator(new_creator=user1_str)

def test_remove_creator(context: AlgopyTestContext, contract: TurtleMonitor) -> None:
    test_app = context.ledger.get_app(contract)

    # 1) Creo un account user1
    user1 = context.any.account()
    user1_str = arc4.String(str(user1))  # arc4.String

    # 2) Chiamo add_creator con l'admin di default (context.default_sender)
    contract.add_creator(new_creator=user1_str)

    # 3) Controllo la box
    box_key = b"creator:" + user1_str.bytes
    val = context.ledger.get_box(contract, box_key)
    assert val == b"1"
    # 4) controllo che la box sia rimossa
    contract.remove_creator(old_creator=user1_str)
    val_after = context.ledger.get_box(contract, box_key)
    assert val_after == b""
    # 5)provo a chiamare il metodo remove creator con un account non admin
    user2 = context.any.account()
    with context.txn.create_group(active_txn_overrides={"sender": user2}):
        with pytest.raises(Exception):
            contract.add_creator(new_creator=user1_str)


def test_create_egg_data(context: AlgopyTestContext, contract: TurtleMonitor) -> None:
    """
    Verifica che chiamando create_egg_nft con un data_blob contenente
    'data_schiusa', 'latitudine' e 'longitudine', nella box 'egg:<asset_id>'
    vengano salvati quei valori.
    """

    # 1) Ricaviamo l'app dal ledger
    test_app = context.ledger.get_app(contract)

    # 2) Creiamo un account “creator”, e abilitiamolo se necessario
    # Se l'admin di default può creare, non serve. Altrimenti:
    # creator_acc = context.any.account()
    # contract.add_creator(new_creator=arc4.String(str(creator_acc)))
    # context.ledger.set_sender(creator_acc) 
    # Oppure se l'admin di default è sufficiente, lasciamo così.

    # 3) Prepariamo il data_blob
    # Esempio: "data_schiusa=2023-10-01;latitudine=12.345;longitudine=67.89"
    data_schiusa = "2023-10-01"
    latitudine = "12.345"
    longitudine = "67.89"
    data_str = f"data_schiusa={data_schiusa};latitudine={latitudine};longitudine={longitudine}"

    # 4) Chiamiamo create_egg_nft
    # name e url li mettiamo a piacere
    result = contract.create_egg_nft(
        name=arc4.String("Egg di Test"),
        url=arc4.String("ipfs://some_image"),
        data_blob=arc4.String(data_str)
    )
    created_asa_id = result  # arc4.UInt64 -> Python int

    # 5) Leggiamo la box 'egg:<asset_id>'
    box_key = b"egg:" + op.itob(arc4.UInt64(created_asa_id))
    val = context.ledger.get_box(contract, box_key)
    restored_string_obj = arc4.String.from_bytes(val)

    # 6) Verifichiamo che contenga esattamente data_schiusa, latitudine e longitudine
    # 'val' è di tipo bytes. Confrontiamo con data_str codificata in UTF-8
    assert restored_string_obj == data_str, "La box deve contenere i valori passati in data_blob"

    # (Facoltativo) Se vuoi controllare i singoli campi:
    assert b"data_schiusa=2023-10-01" in val
    assert b"latitudine=12.345" in val
    assert b"longitudine=67.89" in val

def test_update_egg_extra_field(context: AlgopyTestContext, contract: TurtleMonitor) -> None:
    """
    1) Crea un ASA con create_egg_nft
    2) Aggiorna l'url e data_blob (aggiungendo 'operatore=Marco Rossi' e cambiando 'longitudine=100')
    3) Verifica che la box abbia il nuovo data_blob
    """
    test_app = context.ledger.get_app(contract)

    # 1) Creazione dell'ASA
    # Ad esempio, un data_blob iniziale con
    # data_schiusa=2023-10-01;latitudine=12.345;longitudine=67.89
    initial_data_str = "data_schiusa=2023-10-01;latitudine=12.345;longitudine=67.89"
    
    create_res = contract.create_egg_nft(
        name=arc4.String("Egg #1"),
        url=arc4.String("ipfs://initial.png"),
        data_blob=arc4.String(initial_data_str)
    )
    created_asa_id = int(create_res)  # se arc4.UInt64 supporta int()
    ##print("TEAL logsssssssssssssssssssssssssssss:", created_asa_id)
    # Recuperiamo la box "egg:<asa_id>"
    egg_key = b"egg:" + op.itob(arc4.UInt64(created_asa_id))
    box_val = context.ledger.get_box(contract, egg_key)
    
    # Se vogliamo decodificare come arc4.String:
    initial_decoded = arc4.String.from_bytes(box_val)
    assert initial_decoded.native == initial_data_str, "Verifica data_blob iniziale"

    # 2) Aggiorniamo l'url e il data_blob
    #   - latitudine resta 12.345
    #   - longitudine diventa 100
    #   - aggiungiamo operatore=Marco Rossi
    updated_data_str = "data_schiusa=2023-10-01;latitudine=12.345;longitudine=100;operatore=Marco Rossi"

    new_url_str = "ipfs://updated_schiusa.png"

    test = contract.update_egg_data(
        asa_id=algopy.UInt64(created_asa_id),
        new_url=algopy.String(new_url_str),
        data_blob=algopy.String(updated_data_str),
    )
    ##print("TEAL logsssssssssssssssssssssssssssss:", test)

    
    # 3) Verifichiamo che la box contenga il nuovo data_blob
    box_val_after = context.ledger.get_box(contract, egg_key)

    # decodifica
    assert box_val_after == updated_data_str.encode("utf-8"), "La box deve avere il nuovo data_blob"

    # (Opzionale) Verificare che l'ASA abbia url = new_url_str
    # asa = context.ledger.get_asset(created_asa_id)
    # assert asa.url == new_url_str, "L'ASA deve avere l'url aggiornato"


    # (Opzionale) Potresti loggare / stampare i log
    # logs = context.ledger.get_transaction_logs(...)
    # etc. a seconda di come algopy_testing espone i log

