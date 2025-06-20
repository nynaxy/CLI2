const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      console.log('Kontakt:', contact);
    } else {
      console.log('Kontakt o podanym ID nie istnieje');
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
      return;
    }
    let contacts = JSON.parse(data);
    contacts = contacts.filter(c => c.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Błąd podczas zapisu pliku:', err);
        return;
      }
      console.log('Kontakt usunięty');
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone
    };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Błąd podczas zapisu pliku:', err);
        return;
      }
      console.log('Kontakt dodany:', newContact);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };