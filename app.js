const $app_container = document.querySelector('#app-container'); 
const $load_img_btn = document.querySelector('#load-image'); 

const API = "https://demonic-leadership.000webhostapp.com/"; 
const PATH = API + 'img/'; 


launch(); 



async function launch() {
	let data = await getImages(); 

	const display = () => {
		if (data.length > 0) {
			let rand = Math.floor(Math.random() * data.length);  
			loadImage(data[rand]); 
			data.splice(rand, 1);
			console.log('Reste ' + data.length); 
		}
	}

	// init : 
	display(); 

	// handle events :
	window.addEventListener('scroll', event => {
		if (isScrollAtBottom()) {
			display(); 
		}
	})

}



function loadImage(src) {
	$app_container.querySelector('div').insertAdjacentHTML('beforeend', templateHTML(src).outerHTML); 
}


function templateHTML(src) {
	let img = document.createElement('img'); 
	img.src = PATH + src; 
	let container = document.createElement('div'); 
	container.classList.add('img-container'); 
	container.innerHTML = img.outerHTML; 
	console.log(container); 
	return container; 
}


async function getImages() {
	return fetch(API)
		.then(res => res.json())
		.then(data => { return data })
		.catch(err => console.log(err)); 
}



function isScrollAtBottom() {
	// Hauteur totale de la page (incluant le contenu défilable)
	const totalHeight = document.body.scrollHeight;
  
	// Position actuelle du haut de la fenêtre visible
	const visibleTop = window.scrollY;
  
	// Hauteur de la fenêtre visible
	const visibleHeight = window.innerHeight;
  
	// On considère que l'utilisateur a atteint le bas de la page
	// si la somme de la position actuelle du haut de la fenêtre visible
	// et de la hauteur de la fenêtre visible est égale à la hauteur totale de la page.
	return visibleTop + visibleHeight >= totalHeight - 100;
}