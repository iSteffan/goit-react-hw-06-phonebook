import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, deleteContact, addContact } from 'redux/contactSlice';
import { setFilter, getFilter } from 'redux/filterSlice';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const handleInputChange = evt => {
    dispatch(setFilter(evt.currentTarget.value));
  };

  const filteredArr = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  const doDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const doAddContact = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSave={doAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleInputChange={handleInputChange}></Filter>
      <ContactList
        contacts={filteredArr()}
        onDelete={doDeleteContact}
      ></ContactList>
    </div>
  );
};
