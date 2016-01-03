(function myBlog() {
	document.addEventListener("DOMContentLoaded", function(event){
		var app = {
			myDOMapi: domApiFunc(),
			DataApi: dataApiFunc(),
			addMenu: addMenuFunc,
			addSections: addSectionsFunc,
			registerEvents: registerEventsFunc,
			mainContainer: null,
			sections: null,
			menu: null,
			init: init
		}
			
		app.init();
			
		function init(){
			this.addMenu();
			this.addSections();
			this.registerEvents();
		};
		
		function addMenuFunc(){
			function constructMenu(){
				var container = this.myDOMapi.getContainer("main-nav");
				var newNav = document.createElement("nav");
				var newList = document.createElement("ul");
				newNav.appendChild(newList);
				container.appendChild(newNav);
				function addList(item, index){
					var index = index + 1;
					newList.innerHTML += "<li>" + (item.title + " " + index) + "</li>";
				}
				this.myDOMapi.addItems(this.menu, addList);
			}
			function addMenuToDOM(obj){
				this.sections = obj.data.sections;
				this.menu = obj.data.menu;
				constructMenu.call(this);
			}
			this.DataApi.getData(addMenuToDOM.bind(this));
			
		};
			
		function addSectionsFunc(){
			function constructSection(){
				var container = this.myDOMapi.getContainer("main-sections-container");
				function addItemSection(item, index){
					var section = document.createElement("section");
					section.classList.add('animate-in');
					var header = document.createElement("header");
					header.appendChild(document.createElement("h2"));
					var text1 = document.createElement("p");
					var boton = document.createElement("div");
					boton.classList.add('full');
					boton.appendChild(document.createElement("span"));
					var article = document.createElement("article");
					var imagen = document.createElement("img");
					article.appendChild(imagen);
					var articleText = document.createElement("p");
					article.appendChild(articleText);
					section.appendChild(header);
					section.appendChild(text1);
					section.appendChild(boton);
					section.appendChild(article);
					container.appendChild(section);
					var index = index + 1;
					header.children[0].textContent = item.title;
					text1.textContent = item.text;
					boton.children[0].textContent = "more";
					imagen.src = item.image;
					articleText.textContent = item.article;
				}
				this.myDOMapi.addItems(this.sections, addItemSection);
			}
			function addSectionsToDOM(obj){
				this.sections = obj.data.sections;
				constructSection.call(this);
			}
			this.DataApi.getData(addSectionsToDOM.bind(this));
		};

		function domApiFunc(){
			function getContainer(id){
				return document.getElementById(id);
			}
			function addItems(items, callback){
				for(var i = 0; i < items.length; i++){
					callback(items[i], i);
				};
			}
			
			var publicAPI = {
				getContainer: getContainer,
				addItems: addItems
			}
			
			return publicAPI;
		};
		
		function dataApiFunc() {
			var URLs = {
				get: "data/sections.json",
				post: "nothing yet"
			};
			function getData(callBack) {
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						callBack(JSON.parse(xmlhttp.responseText));
					};
				};
				xmlhttp.open("GET", URLs.get, true);
				xmlhttp.send();
			}
			function sendData() {
				//code to send data
				//to server/WS
			}
			var publicAPI = {
				getData: getData,
				sendData: sendData
			}
				return publicAPI;
		};
		
		function registerEventsFunc () {
			var menuMobileBtn = document.querySelector("#menu-mobile-btn"),
			menuMobileContainer = document.querySelector("#menu-mobile-container"),
			bodyTag = document.getElementsByTagName('body')[0],
			target = null;
			menuMobileBtn.addEventListener("touchstart", function (event) {
				target = event.target.localName === 'span' ? event.target.parentElement : event.target
				if (target.classList.length === 0) {
					bodyTag.classList.add('no-scroll');
					menuMobileContainer.classList.add('open');
					target.classList.add('open');
				}else {
					bodyTag.classList.remove('no-scroll');
					menuMobileContainer.classList.remove('open');
					target.classList.remove('open');
				};
			}, false);
		}
	});
})();

