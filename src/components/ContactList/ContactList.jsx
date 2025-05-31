import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name || '');

  const normalizedFilter = filter.toLowerCase();

  const [debouncedContacts] = useDebounce(normalizedFilter, 500);

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(debouncedContacts)
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
