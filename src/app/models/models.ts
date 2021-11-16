export interface Article {
  payload: any;
  id: string;
  titre: string;
  contenu: string;
  image: string;
}
export interface Onglet {
  id: string;
  titre: string;
  lien: string;
  dossier: string;
}
export interface Page {
  id: string;
  titre: string;
  contenu: string;
  chemin: string;
}
export interface Admin {
  mail: string;
  password: string;
}
