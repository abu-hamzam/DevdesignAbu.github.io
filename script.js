// Fetch and render projects dynamically from projects.json
async function loadProjects() {
  const url = 'projects.json'; // JSON file in the same directory
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const projects = await response.json();
    const grid = document.getElementById('portfolio-grid');

    projects.forEach((project, index) => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project', 'animate__animated', index % 2 === 0 ? 'animate__slideInLeft' : 'animate__slideInRight');
      
      // Add media: video if provided, else image
      if (project.videoSrc) {
        const video = document.createElement('video');
        video.src = project.videoSrc;
        video.controls = true;
        video.style.width = '100%';
        projectDiv.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = project.imgSrc;
        img.alt = project.title;
        projectDiv.appendChild(img);
      }

      const p = document.createElement('p');
      p.textContent = project.title;
      projectDiv.appendChild(p);

      // Add click event for modal
      projectDiv.onclick = () => openModal(project.title, project.desc, project.imgSrc, project.videoSrc, project.link);

      grid.appendChild(projectDiv);
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Updated modal to handle video and link
function openModal(title, desc, imgSrc, videoSrc, link) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;

  const mediaContainer = document.getElementById('modal-media');
  mediaContainer.innerHTML = ''; // Clear previous media

  if (videoSrc) {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;
    video.style.maxWidth = '100%';
    mediaContainer.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = title;
    img.id = 'modal-img';
    mediaContainer.appendChild(img);
  }

  const linkElement = document.getElementById('modal-link');
  if (link) {
    linkElement.href = link;
    linkElement.style.display = 'inline-block';
  } else {
    linkElement.style.display = 'none';
  }

  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
}

// Basic form validation (for contact page)
if (document.getElementById('contact-form')) {
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    if (!name.value || !email.value) {
      e.preventDefault();
      alert('Please fill in all required fields.');
    }
  });
}

// Load projects on page load
if (document.getElementById('portfolio-grid')) {
  loadProjects();
}
