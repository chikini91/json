const url = 'http://localhost:3000/items';

axios.get(url).then(res => {

    const data = res.data;
    console.log(data)
    const columnNames = Object.keys(data[0]);
    console.log(columnNames)

    const template = document.getElementById('template').innerHTML;
    Mustache.parse(template);
    const total = data
        .map(item => item.currency)
        .reduce((sum,current) => sum + current);
    const renderedStuff = Mustache.render(template, {items: data, total});
    document.getElementById('root').innerHTML = renderedStuff;

    const search = e => {
        const searchFieldValue = e.target.value.trim().toLowerCase();

        const td = itemsTable.querySelectorAll('tbody td');

        td.forEach(td => td.classList.remove('active'));

        if (!searchFieldValue) return

        [...td]
            .filter(td => td.textContent.toLowerCase().indexOf(searchFieldValue) >= 0)
            .forEach(td => td.classList.add('active'))
    };

    const itemsTable = document.querySelector('table');

    const searchField = document.getElementsByTagName('input')[0];

    searchField.addEventListener('input', search)


});
