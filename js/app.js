// categories section
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));

}

const displayCategories = categories => {
    const categoriesList = document.getElementById('categories');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<a>${category.category_name}</a>`;
        categoriesList.appendChild(li);
    })
}

loadCategories()