# 🗳️ L'Urne Vide

**Jours sans référendum national en France.**

L'Urne Vide est un projet citoyen et indépendant. Il compte en direct le temps écoulé depuis le dernier référendum national, le **29 mai 2005**, et retrace les dix référendums de la Ve République.

- 🌐 Site : https://samuelrobinet.github.io/urne-vide/
- 🐦 X : [@UrneVide](https://x.com/UrneVide) *(à venir)*
- 🦋 Bluesky et 📸 Instagram : *à venir*

## Fonctionnalités

- **Compteur en direct** : nombre total de jours, et détail en années, mois et jours.
- **Chronologie** des 10 référendums de 1958 à 2005 : date, sujet, président et Premier ministre, participation, résultat (adopté en vert, rejeté en rouge) et barre Oui / Non avec repère à 50 %.
- **Chiffres clés** calculés automatiquement : nombre de référendums, jours depuis le dernier, participation moyenne.
- **Menu** qui se resserre au défilement, souligne la section en cours et passe en menu burger sur téléphone.

## Structure

```
index.html          page unique
css/style.css       charte « L'Affiche » : rouge #E4002B, noir, blanc, vert #1E7A3C
                    typographies Big Shoulders Display + Archivo (Google Fonts)
js/main.js          données des référendums, compteur, chronologie, chiffres, menu
assets/favicon.svg  icône du site
```

Site 100 % statique : pas de framework, pas de dépendance, pas d'étape de build.

## Ajouter un référendum

Dans `js/main.js`, ajouter une entrée **en tête** du tableau `REFERENDUMS` (le plus récent en premier) :

```js
{
  date: [2027, 6, 13], titre: 'Sujet du référendum',
  president: '…', pm: '…',
  oui: 0, non: 0, participation: 0,
  texte: 'Résumé en une ou deux phrases.'
},
```

Le compteur repart alors de cette date, et la chronologie comme les chiffres se mettent à jour tout seuls.

## Voir le site en local

Ouvrir `index.html` dans un navigateur. Après une modification, recharger avec **Ctrl+F5**.

## Mise en ligne

Le site est publié avec **GitHub Pages** : Settings → Pages → Source « Deploy from a branch » → branche `main`, dossier `/ (root)`.

## Sources

Résultats proclamés par le [Conseil constitutionnel](https://www.conseil-constitutionnel.fr/). Voir aussi [Vie publique](https://www.vie-publique.fr/).

## À venir

- Bot de publication quotidienne sur X et Bluesky
- Visuel quotidien pour Instagram
