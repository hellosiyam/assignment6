// View page 
const scrollToPage = () => {
    const main_page = document.getElementById('main-page');
    main_page.scrollIntoView({
        behavior: "smooth"
    })
}
// Spine Category
const spineCategory = () => {
    const spinnerContainer = document.getElementById('spinnerContainer');
    const petCard = document.getElementById('pet_card')
    spinnerContainer.classList.remove('hidden');
    petCard.classList.add('hidden');
    setTimeout(() =>{
        spinnerContainer.classList.add('hidden')
        petCard.classList.remove('hidden');
    }, 2000)
}


// Load pet category
const loadPetCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayPetCategory(data.categories);
}

// Remove btn color:
const removeActive = () => {
    const activeBtn = document.getElementsByClassName('category-btn');
    for(let active of activeBtn){
        active.classList.remove('active')
    }
}

// Display pet category 
const displayPetCategory = (categories) => {
    const petCategoryContainer = document.getElementById('category');
    categories.forEach(item => {
        // console.log(item);

        // Create Container
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML =`
        <button id="btn-${item.category}" onClick="loadCategoryData('${item.category}')"  class="w-full h-16 btn btn-outline category-btn"><img class='h-8 w-8' src= ${item.category_icon}/> ${item.category}</button>

        `
        petCategoryContainer.appendChild(categoryContainer)
    });
};
// Lode Category wise
const loadCategoryData = async (item) => {
    
    spineCategory()

    removeActive()

    const activeBtn = document.getElementById(`btn-${item}`)
    activeBtn.classList.add('active')

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${item}`);
    const petDataCollection = await res.json();
    displayAllPets(petDataCollection.data);
}


// Lode pets:
const lodePets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayAllPets(data.pets);
    
}
// Lode Pet Detail
const petDetail = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();
    displayPetDetail(data.petData);
    adoptPet(data);
    
}
// Like Pet
const likePet = (like) => {
    // console.log(like);
    
    const likePetContainer = document.getElementById('like-pet');
    const likePet = document.createElement('div')
    likePet.innerHTML = `
            <img class= 'w-full rounded-lg' src=${like}/>
    `
    likePetContainer.appendChild(likePet);
    
}

// Adopt Pet
const petAdopt = (id) => {
// console.log(id, 'id')
    const adoptModal = document.getElementById('adoptContent');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const classNames = Array.from(adoptModal.classList);
    document.getElementById(`btn${id}`).setAttribute('disabled', true)
    if(classNames.includes('hidden')){
        adoptModal.classList.remove('hidden')
        modalBackdrop.classList.remove('hidden')
    }
    adoptModal.innerHTML=`
    <div class= ' flex flex-col gap-4 text-center items-center justify-center'>
                    <img src = 'https://img.icons8.com/?size=100&id=TGGyAyBJKGRc&format=png&color=000000'/>
                    <h1 class="text-2xl text-[#131313] font-bold">Congrats</h1>
                    <p class="text-base text-black font-normal">Adoption Process is Start For your Pet</p>
                    <h1 id="interval" class="text-4xl font-bold">3</h1>
                    </div>
    `
    // console.log(adoptModal);
    
    // document.getElementById('adoptModalBtn').click()
    comedown();
    adoptContentHide()
}
// ComeDown Timer

const comedown = () => {
    const timerSection = document.getElementById('interval')
    let timer = 3;
    const adoptTime = setInterval(()=>{
        timer -- ;
        timerSection.innerText = `${timer}`

        if (timer === 1 ) {
            clearInterval(adoptTime)
        }
    },1000);
    
}

{/* <dialog id="my_modal_2" class="modal">
                <div class="modal-box">
                  <div id="adoptModal">
                    <div class= ' flex flex-col gap-4 text-center items-center justify-center'>
                    <img src = 'https://img.icons8.com/?size=100&id=TGGyAyBJKGRc&format=png&color=000000'/>
                    <h1 class="text-2xl text-[#131313] font-bold">Congrats</h1>
                    <p class="text-base text-black font-normal">Adoption Process is Start For your Pet</p>
                    <h1 id="interval" class="text-4xl font-bold">3</h1>
                    </div>
                  </div>
                </div>
                <!-- <form method="dialog" class="modal-backdrop">
                  <button>close</button>
                </form> -->
              </dialog> */}
// Adopt content hidden
const adoptContentHide = () => {
    const  adopt = document.getElementById('adoptContent');
    const  modalBackdrop = document.getElementById('modalBackdrop');
    setTimeout(() => {
        adopt.classList.add('hidden')
        modalBackdrop.classList.add('hidden')
    }, 3000)
}

// Display pet Detail
const displayPetDetail = (petCard) => {
    // console.log(petCard);
    const showModal = document.getElementById('displayModal');
    showModal.innerHTML =`
    <div>
        <div>
            <img class= 'w-full rounded-lg' src=${petCard.image}/>
        </div>
        <div class= 'py-4 border-b-2 flex flex-col gap-2'>
            <h2 class="text-2xl text-[#131313] font-bold">${petCard.pet_name}</h2>
                <div class= 'grid grid-cols-2'>
                    <div class = 'flex gap-1 items-center'>
                        <img class= 'h-5 w-5' src="images/Frame.svg"/>
                        <p class= 'text-base text-[#131313B2] font-normal'>
                        Breed: ${petCard.breed ? petCard.breed : 'Not Available' }</p>
                    </div>
                    <div class = 'flex gap-1 items-center'>
                        <img class= 'h-5 w-5' src="images/calender.svg"/>
                        <p class="text-base text-[#131313B2] font-normal">
                            Birth: ${petCard.date_of_birth ? petCard.date_of_birth : 'Not Available'}
                        </p>
                    </div>
                    <div class = 'flex gap-1 items-center'>
                        <img class= 'h-5 w-5' src="images/gender.svg"/>
                        <p class= 'text-base text-[#131313B2] font-normal'>Gender: ${petCard.gender}</p>
                    </div>
                    <div class = 'flex gap-1 items-center'>
                        <img class= 'h-5 w-5' src="images/price.svg"/>
                        <p class= 'text-base text-[#131313B2] font-normal'>Price: ${petCard.price? petCard.price : 'Not Available'}</p>
                    </div>
                    <div class = 'flex gap-1 items-center'>
                        <img class= 'h-5 w-5' src="images/gender.svg"/>
                        <p class= 'text-base text-[#131313B2] font-normal'>Vaccinated status: ${petCard.vaccinated_status? petCard.vaccinated_status : 'Not Available'}</p>
                    </div>
                </div>
            </div>
            <div>
                <div class= 'text-xl text-[#131313] font-semibold py-2'>
                Details Information
                </div>
                <div class= 'text-base text-[#131313]'>
                ${petCard.pet_details}
                </div>
            </div>
    </div>
    `
    document.getElementById('modalShow').click()
    
}


// Display all pets
const displayAllPets = (categories) => {
    const petContainer = document.getElementById('pet_card');
    petContainer.innerHTML = '';

    if (categories.length === 0 ) {
        petContainer.classList.remove('grid')
        petContainer.innerHTML = `
        <div id="pet_card" class="bg-[#13131308] rounded-3xl px-5 lg:px-[115px] flex flex-col lg: h-[250px] lg:h-[490px] items-center justify-center gap-3 lg:gap-6">
             <img class= 'h-[48px] w-[48px] lg:h-[160px] lg:w-[160px] ' src="images/error.webp"/>
             <h1 class= 'text-lg lg:text-4xl text-[#131313] font-bold text-center'>No Information Available</h1>
             <p class= 'text-sm lg:text-base text-[#131313B2] font-normal text-center'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
    }else{
        petContainer.classList.add('grid')
    }
    categories.forEach(item => {
        // console.log(item); 

        // Pet-Card
        const petCard = document.createElement('div');
        petCard.classList = 'card card-compact p-[20px] border';
        petCard.innerHTML = `
        <figure class= 'rounded-lg'>
            <img class= 'h-[160px] w-[100%] object-cover'
            src='${item.image}' />
        </figure>
        <div class="">
            <div class= 'py-4 border-b-2 flex flex-col gap-2'>
                <h2 class="text-xl text-[#131313] font-bold">${item.pet_name}</h2>
                <div class = 'flex gap-1 items-center'>
                    <img class= 'h-5 w-5' src="images/Frame.svg"/>
                    <p class= 'text-base text-[#131313B2] font-normal'>
                    Breed: ${item.breed ? item.breed : 'Not Available' }</p>
                </div>
                <div class = 'flex gap-1 items-center'>
                    <img class= 'h-5 w-5' src="images/calender.svg"/>
                    <p class="text-base text-[#131313B2] font-normal">
                        Birth: ${item.date_of_birth ? item.date_of_birth : 'Not Available'}
                    </p>
                </div>
                <div class = 'flex gap-1 items-center'>
                    <img class= 'h-5 w-5' src="images/gender.svg"/>
                    <p class= 'text-base text-[#131313B2] font-normal'>Gender: ${item.gender}</p>
                </div>
                <div class = 'flex gap-1 items-center'>
                    <img class= 'h-5 w-5' src="images/price.svg"/>
                    <p class= 'text-base text-[#131313B2] font-normal'>Price: ${item.price? item.price : 'Not Available'}</p>
                </div>
            </div>
            
            <div class = 'flex justify-between pt-4'>
            <button onclick="likePet('${item.image}')" class="px-4 py-2 border-2 rounded-xl border-[#0E7A8126] text-base text-[#0E7A81] font-semibold"><img src="images/like.svg"/></button>
            <button id="btn${item.petId}" onclick =" petAdopt('${item.petId}')" class="border-2 rounded-xl border-[#0E7A8126] py-2 px-5 text-base text-[#0E7A81] font-semibold disabled:cursor-not-allowed disabled:opacity-50">Adopt</button>
            <button  onclick="petDetail('${item.petId}')" class="border-2 rounded-xl border-[#0E7A8126] py-2 px-5 text-base text-[#0E7A81] font-semibold">Details</button>
            </div>
        </div>
        `
        petContainer.appendChild(petCard);
        
    });
    
}

lodePets();
loadPetCategory();