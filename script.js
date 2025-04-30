 // Apparition douce des éléments au scroll
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });


document.querySelectorAll('.content, .button').forEach((el) => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Bouton retour en haut
const backToTop = document.createElement("button");
backToTop.textContent = "⬆ Haut";
backToTop.style.cssText = "position:fixed; bottom:20px; right:20px; padding:10px; display:none; background:#ff7e00; border:none; color:white; border-radius:5px; cursor:pointer;";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Date dynamique
const year = new Date().getFullYear();
document.querySelector("footer p").innerHTML = `&copy; ${year} Élégance Sacrée. Tous droits réservés.`;



const panier = [];
const listePanier = document.getElementById("liste-panier");
const totalPanier = document.getElementById("total-panier");

function majPanier() {
  listePanier.innerHTML = "";
  let total = 0;
  panier.forEach((item, index) => {
    total += item.prix;
    const li = document.createElement("li");
    li.innerHTML = `${item.nom} - ${item.prix} € <button onclick="supprimerDuPanier(${index})" style="margin-left:10px; background:red; color:white; border:none; border-radius:5px; cursor:pointer;">✖</button>`;
    listePanier.appendChild(li);
  });
  totalPanier.textContent = total.toFixed(2);
}

function supprimerDuPanier(index) {
  panier.splice(index, 1);
  majPanier();
}

document.querySelectorAll(".ajouter-panier").forEach(btn => {
  btn.addEventListener("click", () => {
    const nom = btn.getAttribute("data-nom");
    const prix = parseFloat(btn.getAttribute("data-prix"));
    panier.push({ nom, prix });
    majPanier();
    alert(`✅ "${nom}" a été ajouté au panier.`);
  });
});

document.getElementById("commandeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const tel = document.getElementById("tel").value;
  const adresse = document.getElementById("adresse").value;

  let message = `Nouvelle commande ! 👇\n\n👤 Nom : ${nom}\n📧 Email : ${email}\n📞 Téléphone : ${tel}\n🏡 Adresse : ${adresse}\n\n🛒 Produits commandés :\n`;
  let total = 0;
  panier.forEach(p => {
    message += `- ${p.nom} : ${p.prix} €\n`;
    total += p.prix;
  });
  message += `\n💰 Total : ${total.toFixed(2)} €`;

  const numeroWhatsApp = "33752224585"; // Ton numéro WhatsApp
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

function envoyerParEmail() {
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const tel = document.getElementById("tel").value;
  const adresse = document.getElementById("adresse").value;

  let message = `Nouvelle commande par Email ! 👇\n\n👤 Nom : ${nom}\n📧 Email : ${email}\n📞 Téléphone : ${tel}\n🏡 Adresse : ${adresse}\n\n🛒 Produits commandés :\n`;
  let total = 0;
  panier.forEach(p => {
    message += `- ${p.nom} : ${p.prix} €\n`;
    total += p.prix;
  });
  message += `\n💰 Total : ${total.toFixed(2)} €`;

  const subject = "Nouvelle commande - Élégance Sacrée";
  const mailtoLink = `mailto:kaoutar_bilal@hotmail.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.location.href = mailtoLink;
}

// Filtrage des produits
const boutons = document.querySelectorAll('.filters button');
const produits = document.querySelectorAll('.produit');

boutons.forEach(btn => {
  btn.addEventListener('click', () => {
    boutons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtre = btn.getAttribute('data-filter');
    produits.forEach(produit => {
      if (filtre === 'all' || produit.classList.contains(filtre)) {
        produit.style.display = 'block';
        setTimeout(() => produit.classList.add('visible'), 50);
      } else {
        produit.classList.remove('visible');
        setTimeout(() => produit.style.display = 'none', 300);
      }
    });
  });
});

// Animation à l'apparition
const observer = new IntersectionObserver(entries => { 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

produits.forEach(produit => {
  observer.observe(produit);
});

window.addEventListener('load', () => {
  produits.forEach(produit => produit.classList.add('visible'));
});


const panier = JSON.parse(localStorage.getItem("panier")) || [];
const listePanier = document.getElementById("liste-panier");
const totalPanier = document.getElementById("total-panier");

function majPanier() {
  listePanier.innerHTML = "";
  let total = 0;
  panier.forEach((item, index) => {
    total += item.prix;
    const li = document.createElement("li");
    li.innerHTML = `${item.nom} - ${item.prix} € <button onclick="supprimerDuPanier(${index})" style="margin-left:10px; background:red; color:white; border:none; border-radius:5px; cursor:pointer;">✖</button>`;
    listePanier.appendChild(li);
  });
  totalPanier.textContent = total.toFixed(2);
}

function supprimerDuPanier(index) {
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier)); // Sauvegarde après suppression
  majPanier();
}

document.querySelectorAll(".ajouter-panier").forEach(btn => {
  btn.addEventListener("click", () => {
    const nom = btn.getAttribute("data-nom");
    const prix = parseFloat(btn.getAttribute("data-prix"));
    panier.push({ nom, prix });
    localStorage.setItem("panier", JSON.stringify(panier)); // Sauvegarde dans le navigateur
    majPanier();

    alert(`✅ "${nom}" a été ajouté au panier.`);
  });
});

// Filtrage des produits
const boutons = document.querySelectorAll('.filters button');
const produits = document.querySelectorAll('.produit');

boutons.forEach(btn => {
  btn.addEventListener('click', () => {
    boutons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtre = btn.getAttribute('data-filter');
    produits.forEach(produit => {
      if (filtre === 'all' || produit.classList.contains(filtre)) {
        produit.style.display = 'block';
        setTimeout(() => produit.classList.add('visible'), 50);
      } else {
        produit.classList.remove('visible');
        setTimeout(() => produit.style.display = 'none', 300);
      }
    });
  });
});

// Animation à l'apparition
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

produits.forEach(produit => {
  observer.observe(produit);
});

window.addEventListener('load', () => {
  produits.forEach(produit => produit.classList.add('visible'));
});

// Envoi de la commande via WhatsApp
document.getElementById("commandeForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const tel = document.getElementById("tel").value;
  const adresse = document.getElementById("adresse").value;

  let message = `Nouvelle commande ! 👇\n\n👤 Nom : ${nom}\n📧 Email : ${email}\n📞 Téléphone : ${tel}\n🏡 Adresse : ${adresse}\n\n🛒 Produits commandés :\n`;
  let total = 0;
  panier.forEach(p => {
    message += `- ${p.nom} : ${p.prix} €\n`;
    total += p.prix;
  });
  message += `\n💰 Total : ${total.toFixed(2)} €`;

  const numeroWhatsApp = "33752224585";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

// Envoi par email
function envoyerParEmail() {
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const tel = document.getElementById("tel").value;
  const adresse = document.getElementById("adresse").value;

  let message = `Nouvelle commande par Email ! 👇\n\n👤 Nom : ${nom}\n📧 Email : ${email}\n📞 Téléphone : ${tel}\n🏡 Adresse : ${adresse}\n\n🛒 Produits commandés :\n`;
  let total = 0;
  panier.forEach(p => {
    message += `- ${p.nom} : ${p.prix} €\n`;
    total += p.prix;
  });
  message += `\n💰 Total : ${total.toFixed(2)} €`;

  const subject = "Nouvelle commande - Élégance Sacrée";
  const mailtoLink = `mailto:kaoutar_bilal@hotmail.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.location.href = mailtoLink;
}
</script>
