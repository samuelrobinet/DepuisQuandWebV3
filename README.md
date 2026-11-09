# L'Urne Vide

Compteur du temps écoulé depuis le dernier référendum national en France (29 mai 2005), avec la chronologie des dix référendums de la Ve République.

Site statique : HTML, CSS et JavaScript, sans framework ni étape de build.

## Structure

```
index.html        page unique
css/style.css     charte « L'Affiche » (rouge #E4002B, noir, blanc ; Big Shoulders Display + Archivo)
js/main.js        données des référendums, compteur, chronologie, chiffres
assets/favicon.svg
```

## Ajouter un référendum

Dans `js/main.js`, ajouter une entrée **en tête** du tableau `REFERENDUMS` (le plus récent en premier). Le compteur, la chronologie et les chiffres se mettent à jour tout seuls.

## Voir le site en local

Ouvrir `index.html` dans un navigateur.

## Mise en ligne

GitHub Pages : Settings → Pages → Source « Deploy from a branch » → `main` / racine.
