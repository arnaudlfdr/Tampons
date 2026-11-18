// Reçoit les tampons envoyés depuis https://arnaudlfdr.github.io/tampons/
// et les range dans le dossier Google Drive « Tampons des amis ».
const DOSSIER = 'Tampons des amis';
const TAILLE_MAX = 40 * 1024 * 1024; // 40 Mo par envoi

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const files = (d.files || []).filter((f) => /^[\w\-. ]{1,80}\.(stl|txt)$/i.test(f.name)).slice(0, 4);
    if (!files.length || !files.some((f) => /\.stl$/i.test(f.name))) return rep({ ok: false, error: 'aucun STL' });
    if (e.postData.contents.length > TAILLE_MAX) return rep({ ok: false, error: 'trop gros' });
    const de = String(d.from || 'Anonyme').replace(/[^\p{L}\p{N} '\-]/gu, '').trim().slice(0, 40) || 'Anonyme';
    const nom = String(d.name || 'tampon').replace(/[^\w\-]/g, '').slice(0, 40) || 'tampon';
    const quand = Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd HH\'h\'mm');
    const racine = dossier(DriveApp.getRootFolder(), DOSSIER);
    const ici = racine.createFolder(`${quand} - ${de} - ${nom}`);
    for (const f of files) {
      const type = /\.stl$/i.test(f.name) ? 'model/stl' : 'text/plain';
      ici.createFile(Utilities.newBlob(Utilities.base64Decode(f.data), type, f.name));
    }
    return rep({ ok: true });
  } catch (err) {
    return rep({ ok: false, error: String(err) });
  }
}

function doGet() { return rep({ ok: true, info: 'Boîte aux lettres des tampons' }); }

function dossier(parent, nom) {
  const it = parent.getFoldersByName(nom);
  return it.hasNext() ? it.next() : parent.createFolder(nom);
}

function rep(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
