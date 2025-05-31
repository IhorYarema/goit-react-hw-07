// import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
// import { nanoid } from 'nanoid';

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(3, 'Too short')
//     .max(50, 'Max 50 symbols')
//     .required('Required'),
//   number: Yup.string()
//     .min(3, 'Too short')
//     .max(50, 'Max 50 symbols')
//     .required('Required'),
// });

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} also in your phonebook.`);
      return;
    }

    dispatch(addContact(name, number));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <input
        className={css.input}
        type="tel"
        name="number"
        placeholder="Number"
        required
      />
      <button className={css.button} type="submit">
        Додати контакт
      </button>
    </form>
  );
}
