import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/auth/actions';
import { selectContacts } from 'redux/auth/selectors';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './contactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const stateContacts = useSelector(selectContacts);
  const [contacts, setContacts] = useState({
    name: '',
    number: '',
  });

  const hanldeSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const newContact = contacts.name;
    const existedContact = stateContacts.some(
      contact => contact.name.toLowerCase() === newContact.toLowerCase()
    );
    if (existedContact) {
      Notiflix.Notify.warning(`Contact ${newContact} already exists.`);
      form.reset();
      return;
    } else {
      dispatch(addContact({ name: contacts.name, number: contacts.number }));
      form.reset();
    }
  };

  const handleChange = e => {
    setContacts(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={hanldeSubmit} className={css.sectionInput}>
        <label className={css.labelInput}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Za]+(([' \-][a-zA-Za])?[a-zA-Za]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
        </label>
        <label className={css.labelInput}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={css.submitBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
