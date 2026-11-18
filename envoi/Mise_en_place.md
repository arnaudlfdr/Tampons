# Recevoir les tampons de tes amis dans Google Drive (5 minutes)

1. Ouvre https://script.google.com sur ton ordi, connecté à ton compte Google, et clique « Nouveau projet ».
2. Efface le contenu, colle tout le fichier Code.gs, puis renomme le projet « Boîte aux tampons ».
3. Clique « Déployer » > « Nouveau déploiement » > roue dentée > « Application Web ».
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
4. Clique « Déployer », puis « Autoriser l'accès » et choisis ton compte. Google affiche « Google n'a pas validé cette application » : c'est normal, c'est ton propre script. Clique « Paramètres avancés » > « Accéder à Boîte aux tampons ».
5. Remplace METS-TON-CODE-ICI par le code à donner à tes amis (avant de déployer). Copie l URL de l application Web (elle finit par /exec) et colle-la dans index.html, constante ENVOI_URL.
6. Sur ton ordi, installe « Google Drive pour ordinateur » : le dossier « Tampons des amis » apparaîtra dans ton Drive, un sous-dossier par envoi (date - prénom - texte).
