const fs = require('fs').promises;
const path = require('path');
const {v4} = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');


async function listContacts() {
        try {
           const data = await fs.readFile(contactsPath);
          const parsedData = JSON.parse(data);
           return parsedData;
        } catch (error) {
            console.log(error);
        }
  }
  
  async function getContactById(id) {
        try {
           const data = await listContacts();
           const oneContact = data.find(contact => contact.id === id);
           if (!oneContact) {
            return null;
           }
           return oneContact; 
        } catch (error) {
            console.log(error);
        }
  }
  
  async function removeContact(id) {
    const data = await listContacts();
    const idx = data.findIndex(contact => contact.id === id);
    if(idx === -1) {
      return null;
    }
    const newContacts = data.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return data[idx]
  }
  
  async function addContact(name, email, phone) {
    
        try {
          const data = await listContacts();
          const newContact = {id: v4(), name, email, phone}
          data.push(newContact);
          await fs.writeFile(contactsPath, JSON.stringify(data))
          return newContact;
        } catch (error) {
            console.log(error)
        }
  }


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}