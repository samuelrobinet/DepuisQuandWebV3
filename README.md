# 🗳️ Depuis Quand ? 

## 🎯 Aperçu

**Depuis Quand ?** est un projet citoyen qui met en lumière le temps écoulé depuis le dernier référendum national français (29 mai 2005) et présente une chronologie détaillée des référendums de la Ve République.

- 🌐 [Site en ligne]
- 🐦 [Twitter Bot](https://twitter.com/BOTDepuisQuand)

## ✨ Fonctionnalités

### 🕐 Compteur en temps réel
- Calcul du temps écoulé depuis le dernier référendum
- Affichage en années, mois, jours et total de jours
- Mise à jour automatique

### 📜 Chronologie interactive
- Timeline verticale élégante avec animations
- Les derniers référendums nationaux documentés
- Visualisation des résultats avec barres proportionnelles
- Descriptions de chaque référendum


3. **Accéder au site**
```

```


### Modifier le compteur

Dans `js/script.js`, ligne 18 :

```javascript
const CONFIG = {
    referendumDate: new Date(2005, 4, 29), // Format: (année, mois-1, jour)
    // ...
};
```

### Ajout de données
Pour ajouter de nouvelles données statistiques, modifiez la fonction `updateStatistics()` dans `js/main.js`.

D'autres fonctionnalité sont à ajouter (ajout de réréférendums)

