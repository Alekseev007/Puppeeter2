Feature: Film tests
    Scenario: The first happy test
        Given user is on "/index.php" page
        When user choose date "дата сеанса"
        When user choose time "время сеанса"
        When user choose plase "место"
        When user click by "забронировать" button
        Then user see "Получить код бронирования"

    Scenario: The second happy test
        Given user is on "/index.php" page
        When user choose date "дата сеанса"
        When user choose time "время сеанса"
        When user choose plase another "место"
        When user click by "забронировать" button
        Then user see another "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."

    Scenario: The sad test
        Given user is on "/index.php" page
        When user choose date "дата сеанса"
        When user choose time "время сеанса"
        When user choose plase "место" untouchable
        Then button for booking is inactive "true"
