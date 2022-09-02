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
        console.log(category)
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadNews('${category.category_id}')">${category.category_name}</a>`;
        categoriesList.appendChild(li);
    })
}

loadCategories()


// news section
const loadNews = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))

}

const displayNews = news => {
    console.log(news)
    const cardContainer = document.getElementById('card-conatiner');
    cardContainer.textContent = '';
    news.forEach(singleNews => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 w-3/4 my-4 mx-auto shadow-xl">
        <figure><img src="${singleNews.thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
            <h2 class="card-title">${singleNews.title}</h2>
            <p class="text-slate-500">${singleNews.details.length < 300 ? singleNews.details : singleNews.details.slice(0, 300) + "..."}</p>
         <div class="card-actions justify-between">
            <div class="flex gap-2"> 
               <img class="w-7 h-7 rounded-full" src="${singleNews.author.img}">
               <p class="font-semibold">${singleNews.author.name}</p>
            </div>
            <div>
                 <p class="font-bold">Rating : <span class="text-rose-500">${singleNews.rating.number}</span></p>
            </div>
            <button class="btn btn-primary">Show Deatil</button>
            </div>
        </div>
    </div>`;
        cardContainer.appendChild(cardDiv)
    })
    //     cardContainer.innerHTML = `
    //         <div class="card lg:card-side bg-base-100 w-3/4 my-4 mx-auto shadow-xl">
    //             <figure><img src="${news.thumbnail_url}" alt="Album"></figure>
    //             <div class="card-body">
    //                 <h2 class="card-title">${news.title}</h2>
    //                 <p class="text-slate-500">${news.details.length < 300 ? news.details : news.details.slice(0, 300) + "..."}</p>
    //              <div class="card-actions justify-between">
    //                 <div class="flex gap-2"> 
    //                    <img class="w-7 h-7 rounded-full" src="${news.author.img}">
    //                    <p class="font-semibold">${news.author.name}</p>
    //                 </div>
    //                 <div>
    //                      <p class="font-bold">Rating : <span class="text-rose-500">${news.rating.number}</span></p>
    //                 </div>
    //                 <button class="btn btn-primary">Show Deatil</button>
    //                 </div>
    //             </div>
    //         </div>
    // `;

}

// loadNews('01')