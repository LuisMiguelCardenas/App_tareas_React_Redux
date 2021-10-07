import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

//react-journal
//upload_preset
export const startNewNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    //console.log( uid )

    const doc = await addDoc(collection(db, `${uid}/journal/notes`), {
      title: "",
      body: "",
      date: new Date().getTime(),
    });
    dispatch(
      activeNote(doc.id, {
        title: "",
        body: "",
        date: new Date().getTime(),
      })
    );
    dispatch(addNewNote( doc.id, {
      title: "",
      body: "",
      date: new Date().getTime(),
    }))
    //console.log("Document writen with id",doc.id)
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
    await updateDoc(noteRef, noteToFirestore);
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire({
      icon: "success",
      title: "Tarea guardada",
      showConfirmButton: false,
      timer: 1500,
    });
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Cargando...",
      text: "Subiendo imagen",
      allowOutsideClick: false,
      onBeforeOpen() {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const noteRef = doc(db, `${uid}/journal/notes/${id}`);
    await deleteDoc(noteRef);

    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLoguot = () => ({
  type: types.notesLoggoutClaning,
});
