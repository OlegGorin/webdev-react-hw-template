# Skypro.Music

Верстка для учебного проекта. [Ссылка на макет в фигме](https://www.figma.com/file/XbFmF8JhhuJn0E9C060k8f/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81?type=design&node-id=8621%3A9&mode=design&t=LFWlP3ewfOpihJBU-1). 

Чек-лист

1. Логика работы приложения соответствует описанию использования, который приложен в макете в Figma.
1.1. При загрузке приложения открывается страница с треками. Спсок треков располагается в центральной части страницы. В правой части тсраницы расположены т.н. Сайдбар - 3 заранее предопределенных списка с различными треками.
1.2. Над спиком треков расположены строка поиска, две кнопки для фильтрации треков по исполнителю и жанру и одна кнопка для сортировки треков по году выпуска.
1.2.1.  Пользователь вводит название трека в строке "Поиск", и происходит фильтрация треков по названию.
1.2.2. Если пользователь включает фильтрацию по "исполнителю", открывается выпадающее меню со спиком исполнителей треков из данного плейлиста. Пользователь может одновременно выбрать несколько исполнителей. При этом на границе очертания кнопуи фильтрации появляется счетчик количества выбранных параметров фильтрации.
1.2.3. При нажатии на фильтр по "жанру" появляется выпадающее меню, в котором  пользователь может выбрать несклоько жанров одновременно.
При этом также на границе кнопки появляется счетчик выбранных параметров фильтрации. Выбранная строка меню (активная) подсвечивается другим цветом. Повторный клик на активные строки деактивирует их дествие. Это же касается и фильтрации по "исполнителю".
1.2.4. Если по выбранным фильтрам/поиску результат отстутствует,на месте списка треков выводится сообщение "Треки не найдены".
1.2.5. Сортировка треков по году выпуска может осуществляться тремя способами: 
    - от старых к новым;
    - от новых к старым;
    - по умочанию.
    При этом можно выбрать лишь один способ сортировки - при выборе нового способа предыдущий "сбрасывается".
1.3. Методы фильтрации, сортировки и поиска треков распространяются и на предопределенные заранее списки треков из Сайдбара.

2. Воспроизведение треков.
2.1. Чтобы запустить воспроизведение треков Пользователю достаточно "кликнуть" на один из треков в плейлисте. При этом внизу страницы появляются "органы управления" треками - Плейбар.
2.2. Пользователь может переключаться с трека на трек как в сторону "увеличения", так и в сторону "уменьшения", ставить трек на паузу, а также "перемешивать треки" в случайном порядке.
2.3. При воспроизведении трека напротив его названия будет мерцать фиолетовая точка. При этом по окончании воспроизведения текущего трека автоматически начинает воспроизводиться следующий. Если этот трек окажется последним в списке, то воспроизведение останавливается.

3. Авторизация.
2.1. В левой верхней части страницы расположен так называемый "бургер" - три горизотальные полосы, при нажатии на которые открывается выпадающее меню (меню навигации) с возможными действиями Пользователя.
2.1.1. Пользователь может авторизоваться, нажав на ссылку "Войти". При этом откроется страница авторизации, где Пользователь должен ввести достоверные данные (почту и пароль).
2.1.2. Данные о зарегистрированных пользователях хранятся на сервере, доступ к ним осуществляется посредством API.
2.1.3. Чтобы приложение в случае некорректного ввода данных авторизации не отправляло на сервер заведомо ошибочные запросы, на этапе ввода логина/пароля производится контроль полей ввода. В случае незаполненности поля ввода или несоответствии введенных данных определенным критериям (почта - не менее 8 символов, пароль - не менее 6 символов, при этом  введенные данные в поле почты должны соответсвовать формату email) на форме выводится соответствующее предупреждение.
2.1.4. Если Пользователь ещё не зарегистрирован в приложении, можно перейти на страницу регистрации. Правила заполнения полей ввода такие же как при авторизации. 
2.1.5. После успешного завершения процесса регистрации приложение перенаправляет Пользователя на страницу авторизации.

4. Работа приложения с авторизованным Пользователем.
4.1. Все действия с треками, которые были приведены выше, доступны авторизованному Пользователю. Кроме того у авторизованного Пользователя появляется возможность ставить и убирать лайки на треки.
4.2. Добавить или снять лайк с трека можно как в списке треков, так и в плейбаре.
4.3. При установке лайка на трек он(трек) автоматически попадает в список "Мой плейлист" (Меню навигации).
4.4. При клике на пункт меню навигации "Мой плейлист" открывается список треков с проставленными Пользователем лайками.
4.5. В случае повторного нажатия на символ лайка он убирается, а соответствующий трек исключается из списка "Мой плейлист" (Мои треки).
4.6. Процесс активации/деактивации лайка также фиксируется на сервере посредством доступа через API. Поэтому при последущем сеансе работы в приложении Пользователь увидит свой плейлист в том же состоянии, в котором он его сформировал в предыдущем сеансе.

5. Выход из аккаунта.
5.1. Пользователь может завершить сеанс работы под своими учетными данными нажав на ссылку "Выйти" в меню навигации или нажав на символ в правом верхнем углу рядом с именем Пользователя.
5.2. При активации "выхода" приложение перенаправляет Пользователя на страницу авторизации.