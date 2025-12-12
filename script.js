        // Gestion du changement de thème
        document.getElementById('theme-toggle').addEventListener('click', function() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            
            // Mise à jour de l'icône
            const icon = this.querySelector('i');
            if (newTheme === 'dark') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        });

        // Animation des barres de compétences au défilement
        function animateSkills() {
            const skillBars = document.querySelectorAll('.progress');
            skillBars.forEach(bar => {
                const value = bar.getAttribute('value');
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = value + '%';
                }, 300);
            });
        }

        // Observer pour déclencher l'animation des compétences
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.getElementById('competences'));

        // Gestion du formulaire de contact
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    this.reset();
                }, 3000);
            }, 1500);
        });

        // Navigation fluide
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

// Fonction pour envoyer l'email
function sendEmail(form) {
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
    
    // Votre adresse email
    const yourEmail = "fatimatabintaniang8@gmail.com";
    
    // Construction du lien mailto
    const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    // Ouverture du client email
    window.location.href = mailtoLink;
    
    // Réinitialisation du formulaire (optionnel)
    form.reset();
    
    // Message de confirmation
    alert("Votre client email va s'ouvrir. Veuillez envoyer le message.");
}

// Gestion des projets
document.addEventListener('DOMContentLoaded', function() {
    // État des projets
    let allProjectsVisible = false;
    const projectsContainer = document.getElementById('projects-container');
    const showAllBtn = document.getElementById('show-all-projects');
    const filters = document.querySelectorAll('#filters button');
    const allProjects = document.querySelectorAll('.project-card');
    
    // Afficher/Masquer tous les projets
    if (showAllBtn) {
        showAllBtn.addEventListener('click', function() {
            const hiddenProjects = document.querySelectorAll('.project-card.hidden');
            
            if (!allProjectsVisible) {
                // Afficher tous les projets
                hiddenProjects.forEach(project => {
                    project.classList.remove('hidden');
                });
                
                // Changer le texte du bouton
                showAllBtn.innerHTML = '<i class="fas fa-chevron-up mr-2"></i> Voir moins de projets';
                allProjectsVisible = true;
                
                // Ajouter une animation
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        project.classList.remove('hidden');
                        
                        setTimeout(() => {
                            project.style.transition = 'all 0.5s ease';
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
                
                // Scroll doux vers le bouton après l'expansion
                setTimeout(() => {
                    showAllBtn.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, hiddenProjects.length * 100);
                
            } else {
                // Cacher les projets supplémentaires (garder les 3 premiers)
                allProjects.forEach((project, index) => {
                    if (index >= 3) {
                        project.classList.add('hidden');
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                    }
                });
                
                // Changer le texte du bouton
                showAllBtn.innerHTML = '<i class="fas fa-chevron-down mr-2"></i> Voir tous mes projets';
                allProjectsVisible = false;
                
                // Scroll vers la section projets
                setTimeout(() => {
                    document.getElementById('projets').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            }
        });
    }
    
    // Gestion des filtres
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Mettre à jour les boutons actifs
            filters.forEach(btn => {
                btn.classList.remove('active', 'btn-custom');
                btn.classList.add('btn-outline');
            });
            
            this.classList.add('active', 'btn-custom');
            this.classList.remove('btn-outline');
            
            // Filtrer les projets
            allProjects.forEach(project => {
                const categories = project.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    // Afficher le projet avec animation
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    project.classList.remove('hidden');
                    
                    setTimeout(() => {
                        project.style.transition = 'all 0.5s ease';
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Cacher le projet
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Mettre à jour l'état du bouton "Voir tous"
            const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');
            if (visibleProjects.length > 3) {
                allProjectsVisible = true;
                showAllBtn.innerHTML = '<i class="fas fa-chevron-up mr-2"></i> Voir moins de projets';
            } else {
                allProjectsVisible = false;
                showAllBtn.innerHTML = '<i class="fas fa-chevron-down mr-2"></i> Voir tous mes projets';
            }
        });
    });
    
    // Gestion des boutons "Voir le projet"
    document.querySelectorAll('.btn-custom.btn-sm').forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer les infos du projet
            const card = this.closest('.project-card');
            const title = card.querySelector('.card-title').textContent;
            const description = card.querySelector('p').textContent;
            
            // Ici, vous pouvez :
            // 1. Ouvrir une modale avec plus de détails
            // 2. Rediriger vers une page dédiée
            // 3. Ouvrir le projet en ligne
            
            // Exemple : afficher une alerte avec le titre
            alert(`Ouverture du projet : ${title}\n\nCette fonctionnalité peut être étendue pour :\n- Afficher une modale détaillée\n- Ouvrir le projet en ligne\n- Montrer plus de screenshots`);
            
            // Pour une vraie implémentation, vous pourriez créer :
            // - Des pages dédiées pour chaque projet
            // - Une modale avec plus d'informations
            // - Des liens vers des dépôts GitHub
        });
    });
});