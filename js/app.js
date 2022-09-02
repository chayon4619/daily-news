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
        // console.log(category)
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
        .catch(error => console.log(error));

}


const displayNews = news => {
    // console.log(news)

    // loader start
    const loderSection = document.getElementById('loader');
    loderSection.classList.remove('hidden')

    const cardContainer = document.getElementById('card-conatiner');
    cardContainer.textContent = '';

    // short by rating
    news.sort((a, b) => {
        return b.total_view - a.total_view
    })



    const foundText = document.getElementById('found-text');
    foundText.innerHTML = `<h1 class="text-center font-bold text-2xl py-4 bg-slate-200"><span class="text-rose-500">${news.length}</span> items found for this category</h1>`
    news.forEach(singleNews => {
        // console.log(singleNews._id)
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
               <p class="font-semibold">${singleNews.author.name ? singleNews.author.name : "No Author"}</p>
            </div>
            <div>
                 <p class="font-bold">Watched : <span class="text-rose-500">${singleNews.total_view ? singleNews.total_view + 'k' : "No View"}</span></p>
            </div>

            <label onclick="showModal('${singleNews._id}')" for="my-modal-3" class="btn btn-primary modal-button">Show Deatil</label>
            
        </div>
    </div>`;
        cardContainer.appendChild(cardDiv);


        // loader end
        loderSection.classList.add('hidden');
    });


    // modal
    // const showModal = id => {
    //     const url = `https://openapi.programming-hero.com/api/news/${id}`
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }
    // showModal()


    // const showModal = async (id) => {
    //     const url = `https://openapi.programming-hero.com/api/news/${id}`;
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     displayModal(data)
    // }
    // const displayModal = deaitlId => {
    //     console.log(deaitlId)
    // }




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



// modal

const showModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModal(data.data[0])
}
const displayModal = deaitl => {
    console.log(deaitl);
    const modalDiv = document.getElementById('modal-div');
    modalDiv.innerHTML = `
    <img src="${deaitl.image_url}" alt="">
    <h3 class="text-lg font-bold">${deaitl.title}</h3>
    <p class="py-4">${deaitl.details}</p>
    <p class="font-bold">Rating : <span class="text-rose-500">${deaitl.rating.number}</span></p>
    `;
}





// loader function
// const isLoading = () => {
//     const loderSection = document.getElementById('loader');
//     if (isLoading(true)) {
//         loderSection.classList.remove('hidden');
//     }
//     else {
//         loderSection.classList.add('hidden');
//     }
// }


// loadNews('01')