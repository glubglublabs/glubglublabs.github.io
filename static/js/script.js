window.addEventListener('hashchange', handleHashChange);

function handleHashChange() {
	loadPage();
}

// load in json with project info
let glubSON;
let projects = [];

fetch(`./static/assets/glubglublabs.json`)
	.then(response => response.json())
	.then(jsonData => {
		glubSON = jsonData;
		loadProjectList();
		loadTemplate();
	})
	.catch(error => console.error("could not load json ", error));


function loadProjectList() {
	glubSON["projects"].forEach(project => {
		projects.push(project["slug"]);
	});
}

function loadTemplate() {
	let container = document.createElement('div');
	container.innerHTML = Container();
	container.id = "container";
	document.body.appendChild(container);
	loadPage();
}

function loadPage() {
	let contentDiv = document.getElementById('right');
	let content;
	let hashString = window.location.hash.substring(1);
	if (routes[hashString]) {
		// content = routes[hashString];
		content = typeof routes[hashString] === 'function'
			? routes[hashString]()
			: routes[hashString];
	} else if (projects.includes(hashString)) {
		content = projectPage(hashString);
	} else {
		content = notPage;
	}
	// Clear existing content
	contentDiv.innerHTML = '';
	// Handle both string and DOM element returns
	if (content instanceof Node) {
		contentDiv.appendChild(content);
	} else {
		contentDiv.innerHTML = content;
	}

}

function randMarginGen() {
	return `
		${Math.floor(Math.random() * 10)}% ${Math.floor(Math.random() * 20)}% ${Math.floor(Math.random() * 10)}% ${Math.floor(Math.random() * 20)}%
	`;
}


function Container() {
	return `
		<div id="right">
		</div>
        <div id="left">
			<nav class="nav-window">
				<a href="/">
					<img src="/static/assets/images/pixelated-image.png" alt="glub glub labs" id="logo">
				</a>
				<ul id="nav-items">
					<li><a href="#projects">projects</a></li>
					<li><a href="#crew">the crew</a></li>
					<li><a href="#glubglubclub">glub glub club</a></li>
					<li><a href="#contact">contact</a></li>
					<li><a href="https://www.instagram.com/glubglublabs/" target="_blank">insta</a></li>
				</ul>
			</nav>
		</div>
    `;
}

function homePage() {
	let fragment = document.createDocumentFragment();

	let homePlaceholder = document.createElement('div');
	homePlaceholder.className = 'overlay-center';
	homePlaceholder.id = 'home-placeholder';
	homePlaceholder.innerHTML = `
		<div id="home-blob">
			<h1>your local<br>🐟 brooklyn-based tech-mongers 🐠</h1>
		</div>
	`;

	let overlayHighlights = document.createElement('div');
	overlayHighlights.className = 'overlay-highlights';
	overlayHighlights.innerHTML = `
		<div id="mr-glub">
			<img src="/static/assets/images/bubbles.png" alt="bubbles" width="100px"
			style="transform: translateY(-60%);">
			<img src="/static/assets/images/mrglub.png" alt="mr glub" title="i don't trust that fish" width="200px"
			style="rotate: 18deg; transform: translateX(-20%);">
		</div>
	`;
	let mrGlub = overlayHighlights.querySelector("#mr-glub")
	mrGlub.addEventListener('click', () => {
		mrGlub.className = "untrustworthy";
		console.log('terry davis is the goat (fish)');
	});
	// highlight 1
	let highlight1 = document.createElement('div');
	highlight1.className = 'highlight-window';
	highlight1.id = 'highlight-1';
	highlight1.innerHTML = `
		<div class="highlight-content">
			<div class="highlight-handle">
				<u>${glubSON["home page"][0]["title"]}</u>
			</div>
			<img src="${glubSON["home page"][0]["image"]}" height="200px">
		</div>
		<div class="highlight-blurb starburst">
			<div class="blurb-content">${glubSON["home page"][0]["short-desc"]}</div>
		</div>
	`;
	highlight1.querySelector('.highlight-content').style.backgroundColor = glubSON["home page"][0]["colour"];
	highlight1.addEventListener('click', () => {
		window.location.href = `#${glubSON["home page"][0]["slug"]}`;
	});
	overlayHighlights.appendChild(highlight1);
	// add starburst
	overlayHighlights.appendChild(
		Object.assign(document.createElement('div'), {
			className: 'starburst we-heart',
			innerHTML: '<div>we ❤️<br>fishy r&d</div>'
		})
	);
	// highlight 2
	let highlight2 = document.createElement('div');
	highlight2.className = 'highlight-window';
	highlight2.id = 'highlight-2';
	highlight2.innerHTML = `
		<div class="highlight-content">
			<div class="highlight-handle">
				<u>${glubSON["home page"][1]["title"]}</u>
			</div>
			<img src="${glubSON["home page"][1]["image"]}" height="200px">
		</div>
		<div class="highlight-blurb starburst">
			<div class="blurb-content">${glubSON["home page"][1]["short-desc"]}</div>
		</div>
	`;
	highlight2.querySelector('.highlight-content').style.backgroundColor = glubSON["home page"][1]["colour"];
	highlight2.addEventListener('click', () => {
		window.location.href = `#${glubSON["home page"][1]["slug"]}`;
	});
	overlayHighlights.appendChild(highlight2);


	fragment.appendChild(homePlaceholder);
	fragment.appendChild(overlayHighlights);

	return fragment;
}

function projectPage(project) {
	if (!project) {
		// Create main container that we'll return
		let container = document.createElement('div');
		container.className = 'overlay-grid';

		// Create and append project list section
		let projectList = document.createElement('ul');
		projectList.id = 'project-list';
		let listContainer = document.createElement('div');
		listContainer.className = 'content-window';
		listContainer.innerHTML = `
            <div class='content-handle'>projects</div>
            <div class='content-content'></div>
        `;
		listContainer.querySelector('.content-content').appendChild(projectList);

		// Create wrapper div for list
		let listWrapper = document.createElement('div');
		listWrapper.appendChild(listContainer);
		container.appendChild(listWrapper);

		// Generate project elements
		glubSON["projects"].forEach((project) => {
			// Add to list
			let projectName = document.createElement('li');
			projectName.innerHTML = `<a href="#${project["slug"]}">${project["title"]}</a>`;
			projectList.appendChild(projectName);

			// Create project card
			let projectDiv = document.createElement('div');
			projectDiv.style = `position: relative; margin: ${randMarginGen()};`;

			// Build content
			projectDiv.innerHTML = `
                <div class="highlight-content" style="position: relative; background-color: ${project["colour"]}; pointer-events: none;">
                    <div class="highlight-handle" style="pointer-events: none;"><u>${project["title"]}</u></div>
                    <img src="./static/assets/projects/${project["slug"]}/${project["slug"]}gif.gif" height="200" style="pointer-events: none;">
                </div>
                <div class="highlight-blurb starburst" style="pointer-events: none;">
                    <div class="blurb-content">${project["short-desc"]}</div>
                </div>
            `;

			// Add click handler
			projectDiv.addEventListener('click', () => {
				window.location.href = `#${project["slug"]}`;
			});

			container.appendChild(projectDiv);
		});
		return container;
	} else {
		// get project data
		let projectData = glubSON["projects"].find(proj => proj.slug === project);

		let container = document.createElement('div');
		container.className = 'overlay-grid';


		// title
		// starburst/short desc
		let titleSection = document.createElement('div');
		titleSection.style.position = 'relative';
		titleSection.style.margin = randMarginGen();
		titleSection.appendChild(
			Object.assign(document.createElement('div'), {
				id: 'home-blob',
				className: 'project-title',
				innerHTML: `<h1>${projectData.title}</h1>`
			})
		);
		titleSection.appendChild(
			Object.assign(document.createElement('div'), {
				className: 'project-blurb starburst',
				innerHTML: `<div class="blurb-content">${projectData["short-desc"]}</div>`
			})
		);
		container.appendChild(titleSection);
		// hero image
		let heroImage = document.createElement('div');
		heroImage.className = 'project-window hero';
		heroImage.style.margin = randMarginGen();
		heroImage.innerHTML = `
			<div class='content-handle'>
				${projectData.title}
			</div>
			<div class='project-content'>
				<img src="/static/assets/projects/${projectData.slug}/${projectData.slug}0.jpeg" width="100%" style="display:block;">
			</div>
		`;
		container.appendChild(heroImage);
		// long desc
		container.appendChild(
			Object.assign(document.createElement('div'), {
				className: 'project-window',
				style: `margin: ${randMarginGen()};`,
				innerHTML: `
					<div class='content-handle'>
						about
					</div>
					<div class='project-content padded'>
						${projectData["long-desc"]}
					</div>
				`
			})
		);

		let yearNlink = document.createElement('div');
		// year
		yearNlink.appendChild(
			Object.assign(document.createElement('div'), {
				className: 'project-window',
				style: `margin: ${randMarginGen()};`,
				innerHTML: `
					<div class='content-handle'>
						year
					</div>
					<div class='project-content padded'>
						${projectData["year"]}
					</div>
				`
			})
		);

		// link
		if (projectData.links.length > 0) {
			let linkList = document.createElement('ul');
			projectData.links.forEach((link) => {
				linkList.appendChild(
					Object.assign(document.createElement('li'), {
						innerHTML: `<a href="${link.link}" target="_blank">${link.title}</a>`
					})
				);
			});
			yearNlink.appendChild(
				Object.assign(document.createElement('div'), {
					className: 'project-window',
					style: `margin: ${randMarginGen()};`,
					innerHTML: `
					<div class='content-handle'>
						links
					</div>
					<div class='project-content padded'>
						${linkList.outerHTML}
					</div>
				`
				})
			);
		}
		container.appendChild(yearNlink);

		// client
		let clientNteam = document.createElement('div');

		clientNteam.appendChild(
			Object.assign(document.createElement('div'), {
				className: 'project-window',
				style: `margin: ${randMarginGen()};`,
				innerHTML: `
					<div class='content-handle'>
						client
					</div>
					<div class='project-content padded'>
						${projectData["client"]}
					</div>
				`
			})
		);

		// collaborators
		let teamList = document.createElement('ul');
		projectData.team.forEach((teammate) => {
			teamList.appendChild(
				Object.assign(document.createElement('li'), {
					innerHTML: `<a href="${teammate.link}" target="_blank">${teammate.name} - ${teammate.role}</a>`
				})
			);
		});
		clientNteam.appendChild(
			Object.assign(document.createElement('div'), {
				className: 'project-window',
				style: `margin: ${randMarginGen()};`,
				innerHTML: `
					<div class='content-handle'>
						team
					</div>
					<div class='project-content'>
						${teamList.outerHTML}
					</div>
				`
			})
		);
		container.appendChild(clientNteam);

		// videos
		if (projectData.videos) {
			for (let i = 0; i < projectData.videos; i++) {
				container.appendChild(
					Object.assign(document.createElement('div'), {
						className: 'project-window',
						style: `margin: ${randMarginGen()};`,
						innerHTML: `
							<div class='content-handle'>
								video
							</div>
							<div class='project-content'>
								<video src="/static/assets/projects/${projectData.slug}/${projectData.slug}video${i}.mov" width="100%" style="display:block;" autoplay muted loop controls>
							</div>
						`
					})
				);
			}
		}

		// photos
		if (projectData.images) {
			for (let i = 1; i < projectData.images; i++) {
				container.appendChild(
					Object.assign(document.createElement('div'), {
						className: 'project-window',
						style: `margin: ${randMarginGen()};`,
						innerHTML: `
							<div class='content-handle'>
								image
							</div>
							<div class='project-content'>
								<img src="/static/assets/projects/${projectData.slug}/${projectData.slug}${i}.jpeg" width="100%" style="display:block;">
							</div>
						`
					})
				);
			}
		}

		return container;
	}
}


function crewPage() {
	let collabElements = document.createElement('ul');
	collabElements.id = 'friend-list';
	glubSON["crew"]["pals"].forEach((collaborator) => {
		let listElement = document.createElement('li');
		listElement.innerHTML = `<a href="${collaborator["link"]}" target="_blank">${collaborator["name"]}</a>`;
		collabElements.appendChild(listElement);
	});

	return `
		<div class="overlay-grid">
			<div style="display: flex; flex-direction: row; align-items: center; margin: ${randMarginGen()};">
				<div id="home-blob">
					<h1>crew</h1>
				</div>
				<div class='content-window' style="width: 150px; margin-left: 2em;">
					<div class='content-handle'>
					</div>
					<img src="/static/assets/crew/crewpic.jpeg" alt="pic of the handsome crew" height="auto" style="display:block;">
				</div>
			</div>
			<div class='content-window' id='tres-window' style='margin: ${randMarginGen()}'>
				<div class='content-handle'>
					${glubSON["crew"]["tres"]["name"]}
				</div>
				<div class='content-content'>
					<img src="${glubSON["crew"]["tres"]["pic"]}" alt="a fishy pic of tres" height="200px">
					<div>
						${glubSON["crew"]["tres"]["bio"]}
					</div>
					<div class="content-links">
						<button onclick="window.open('${glubSON["crew"]["tres"]["link"]}','_blank');">website</button>
					</div>
				</div>
			</div>
			<div class='content-window' id='josh-window' style='margin: ${randMarginGen()};'>
				<div class='content-handle'>
					${glubSON["crew"]["josh"]["name"]}
				</div>
				<div class='content-content'>
					<img src="${glubSON["crew"]["josh"]["pic"]}" alt="a fishy pic of josh" height="200px">
					<div>
						${glubSON["crew"]["josh"]["bio"]}
					</div>
					<div class="content-links">
						<button onclick="window.open('${glubSON["crew"]["josh"]["link"]}','_blank');">website</button>
					</div>
				</div>
			</div>
			<div style='margin: ${randMarginGen()};'>
				<div class='content-window'>
				<div class='content-handle'>
					glub-llaborators
				</div>
				<div class='content-content'>
					${collabElements.outerHTML}
				</div>
				</div>
				<img src="/static/assets/images/mrglub.png" alt="mr glub" width="200px"
					style="rotate: 18deg; margin-top: 2em;">
			</div>
			
		</div>
	`;
}

function clubPage() {
	let upcomingHTML;
	if (glubSON["glub glub club"]["upcoming"]["link"]) {
		upcomingHTML = `<div>${glubSON["glub glub club"]["upcoming"]["date"]} - ${glubSON["glub glub club"]["upcoming"]["title"]}</div><iframe src="${glubSON["glub glub club"]["upcoming"]["embedsrc"]}" width="100%" height="800px" frameborder="0" allow="fullscreen; payment" aria-hidden="false" tabindex="0"></iframe>`;
	} else {
		upcomingHTML = `<div><h1>${glubSON["glub glub club"]["upcoming"]["title"]}</h1></div>`;
	}

	let pastEvents = document.createElement('ul');
	pastEvents.className = "link-list";
	glubSON["glub glub club"]["past"].forEach((meetup) => {
		let listElement = document.createElement('li');
		let eventString = meetup["date"] + " - " + meetup["title"];
		if (meetup["link"]) {
			listElement.innerHTML = `<a href="${meetup["link"]}" target="_blank">${eventString}</a>`;
		} else {
			listElement.innerHTML = `${eventString}`;
		}
		pastEvents.appendChild(listElement);
	});

	return `
		<div class="overlay-grid">
			<div>
				<div id="home-blob">
					<h1>glub glub club</h1>
				</div>
				<div class='content-window' style='margin: ${randMarginGen()};'>
					<div class='content-handle'>
						join the club!
					</div>
					<div class='content-content'>
						<div>
							come work on your projects with us at the lab! glub glub club meets once a month, ranging from coworking time to fishy workshops.
						</div>
						<div>
							get notified, <a href="https://forms.gle/7zyMJUpAuPiNHwfP8" target="_blank">join the mailing list</a>
						</div>
					</div>
				</div>
			</div>
			<div class='content-window' id='upcoming-window' style='margin: ${randMarginGen()};'>
				<div class='content-handle'>
					upcoming meetup
				</div>
				<div class='content-content'>
					${upcomingHTML}
				</div>
			</div>
			<div class='content-window' style='margin: ${randMarginGen()};'>
				<div class='content-handle'>
					past meetups
				</div>
				<div class='content-content'>
					${pastEvents.outerHTML}
				</div>
			</div>
		</div>
	`;
}

function contactPage() {
	return `
		<div class="overlay-center">
			<div id="home-blob">
				<h1>contact</h1>
			</div>
			<div class='content-window' id='contact-window'>
				<div class='content-handle'>
					drop us a line!
				</div>
				<div class='content-content'>
					<div>
						Do you have a project that needs some fishy R&D? No fish too big or small.
					</div>
						<form action="htttps://formsubmit.co/3697364a45bc06ee76e37ad3714b49c0" method="POST">
							<input type="name" name="name" placeholder="name*" required>
							<br>
							<input type="email" name="email" placeholder="email*" required>
							<br>
							<textarea name="message" rows="10" placeholder="tell us about your project*" required></textarea>
							<br>
							<select name="fish" id="cars">
							<option value="none">what is your favorite fish?</option>
							<option value="snapper">yellowtail snapper</option>
							<option value="grouper">strawberry grouper</option>
							<option value="tuna">blackfin tuna</option>
							<option value="parrotfish">rainbow parrotfish</option>
							<option value="mahi">mahi mahi</option>
							</select>
							<br>
							<button type="submit">Submit</button>
						</form>
				</div>
			</div>
		</div>
	`;
}

let notPage = `
	<div id="home-placeholder" class="overlay-center">
		<div id="home-blob">
			<h1>couldn't find what you<br>were fishing for :(</h1>
		</div>
	</div>
	<div class="overlay-highlights">
		<div id="mr-glub">
			<img src="/static/assets/images/bubbles.png" alt="bubbles" width="100px"
			style="transform: translateY(-60%);">
			<img src="/static/assets/images/mrglub.png" alt="mr glub" width="200px"
			style="rotate: 18deg; transform: translateX(-20%);">
		</div>
	</div>
`;


let routes = {
	'': homePage,
	'projects': projectPage,
	'crew': crewPage,
	'glubglubclub': clubPage,
	'contact': contactPage
}