document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  const container = document.getElementById('project-container');
  const errorContainer = document.getElementById('error-container');

  if (!projectId || !projectsData[projectId]) {
    container.style.display = 'none';
    errorContainer.style.display = 'block';
    return;
  }

  const project = projectsData[projectId];
  
  // Set title and subtitle
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-subtitle').textContent = project.subtitle;
  document.title = `${project.title} - LabelX Studio`;
  
  // Build metadata HTML
  const metadataEl = document.getElementById('project-metadata');
  let metaHTML = '';
  if (project.metadata) {
    for (const [key, value] of Object.entries(project.metadata)) {
      metaHTML += `
        <div class="meta-item">
          <div class="meta-label">${key}</div>
          <div class="meta-value">${value}</div>
        </div>
      `;
    }
  }
  metadataEl.innerHTML = metaHTML;
  
  // Set hero image
  document.getElementById('project-hero-image').src = project.heroImage;
  document.getElementById('project-hero-image').alt = project.title;
  
  // Set description
  document.getElementById('project-description').textContent = project.description;
  
  // Set gallery
  const galleryEl = document.getElementById('project-gallery');
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `${project.title} gallery image`;
      galleryEl.appendChild(img);
    });
  }
  
  // Set related projects
  const relatedGrid = document.getElementById('related-projects-grid');
  const projectKeys = Object.keys(projectsData).filter(k => k !== projectId);
  
  // Pick 2 random or first 2 projects
  const relatedKeys = projectKeys.slice(0, 2);
  let relatedHTML = '';
  relatedKeys.forEach(key => {
    const p = projectsData[key];
    relatedHTML += `
      <a href="project.html?id=${key}" class="project-card">
        <div class="project-title-wrapper">
          <h2 class="project-title">${p.title}</h2>
        </div>
        <div class="project-subtitle">${p.subtitle}</div>
        <div class="project-image-wrapper">
          <img src="${p.heroImage}" alt="${p.title}" />
        </div>
      </a>
    `;
  });
  relatedGrid.innerHTML = relatedHTML;
  
  container.style.display = 'block';
});
