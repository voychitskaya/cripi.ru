var TEXTS_DIR = "./texts/";

var menu = require('./menu.json'),
    fs = require('fs');

var template = fs.readFileSync('./templates/main.html', 'utf8');

function renderMenuItem (page, isActive) {
    if (isActive) {
        return '<li><span class="b-menu__item b-menu__item_state_active">' + page.title + '</span></li>';
    } else {
        return '<li><a class="b-menu__item" href="' + page.href + '">' + page.title + '</a></li>';
    }
}

function generateMenu(menu, kind, currentPageId) {
    var html = '';
    for (var i = 0, c = menu.pages.length, page; i < c; i++) {
        page = menu.pages[i];
        html += renderMenuItem(page, page.id === currentPageId);
    }

    if (kind === 'side') {
        html += '<li class="b-menu__item_type_subtitle">Курсы</li>';
    } else {
        html += '<li class="b-menu__item_type_separator">&nbsp;</li>';
    }

    for (i = 0, c = menu.courses.length; i < c; i++) {
        page = menu.courses[i];
        html += renderMenuItem(page, page.id === currentPageId);
    }

    return html;
}

function renderPage(menu, id) {
    var content = fs.readFileSync(TEXTS_DIR + id + '.html', 'utf8'),
        head_menu = generateMenu(menu, 'head', id),
        side_menu = generateMenu(menu, 'side', id);

    var html = template
        .replace('{{content}}', content)
        .replace('{{side_menu}}', side_menu)
        .replace('{{head_menu}}', head_menu);

    fs.writeFileSync('./' + id + '.html', html, 'utf8');
}

for (var i = 0, c = menu.pages.length, page; i < c; i++) {
    page = menu.pages[i];
    console.log('Generating ' + page.id + '.html');
    renderPage(menu, page.id);
}

for (i = 0, c = menu.courses.length; i < c; i++) {
    page = menu.courses[i];
    console.log('Generating ' + page.id + '.html');
    renderPage(menu, page.id);
}


console.log('Done');

