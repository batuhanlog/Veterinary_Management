import React, { useState, useEffect } from 'react';
import { AnimalService } from '../../services/AnimalService';
import './AnimalList.css'; 
import AnimalForm from './AnimalForm';

function AnimalList() {
    const [animals, setAnimals] = useState([]);
    const [newAnimal, setNewAnimal] = useState({
        name: '',
        species: '',
        breed: '',
        gender: '',
        colour: '',
        dateOfBirth: '',
        customerId: ''
    });
    const [editingAnimal, setEditingAnimal] = useState({
      id: '', 
      name: '', species: '', breed: '', gender: '', colour: '', dateOfBirth: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');


    useEffect(() => {
        fetchAnimals();
    }, []);

    const fetchAnimals = async () => { 
        try {
            const data = await AnimalService.getAllAnimals();
            setAnimals(data);
        } catch (error) {
            console.error('Hayvanları alırken bir hata oluştu:', error);
        }
    };

    const handleIdSearchChange = (e) => {
        setSearchId(e.target.value);
    };


        const handleNameSearch = async () => {
            if (searchName) {
                try {
                    const filteredAnimals = await AnimalService.getAnimalsByName(searchName);
                    setAnimals(filteredAnimals);
                } catch (error) {
                    console.error('Hayvanları filtrelerken bir hata oluştu:', error);
                }
            } else {
                fetchAnimals();
            }
        };
    

    const handleIdSearch = async () => {
        if (searchId) { 
            try {
                const animal = await AnimalService.getAnimalById(searchId);
                if (animal) {
                    setAnimals([animal]); 
                } else {

                }
            } catch (error) {

            }
        } else {
            fetchAnimals(); 
        }
    };

    const handleInputChange = (e) => {
        setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
    };

    const handleAddAnimal = async (e) => {
        e.preventDefault();
        try {
            await AnimalService.createAnimal(newAnimal,newAnimal.customerId );
            setNewAnimal({
                name: '',
                species: '',
                breed: '',
                gender: '',
                colour: '',
                dateOfBirth: '',
                customerId: ''
            });
            fetchAnimals(); 
        } catch (error) {
            console.error('Hayvan eklenirken bir hata oluştu:', error);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const customerId = '123'; 
            const response = await AnimalService.createAnimal(newAnimal, customerId);
            console.log('Yeni hayvan başarıyla oluşturuldu:', response);

        } catch (error) {
            console.error('Hayvan oluşturma işlemi başarısız:', error);

        }
    };

    const handleEditClick = (animal) => {
        setEditingAnimal({ ...animal }); 
        setEditMode(true);
      };
    
      const handleUpdateAnimal = async (e) => {
        e.preventDefault();
        try {
            if (editingAnimal.id) {
                await AnimalService.updateAnimal(editingAnimal.id, editingAnimal);
                setEditMode(false);
                setEditingAnimal({ name: '', species: '', breed: '', gender: '', colour: '', dateOfBirth: '' });
                fetchAnimals();
            } else {
                console.error('Hayvan güncellenirken bir hata oluştu: Geçersiz ID');
            }
        } catch (error) {
            console.error('Hayvan güncellenirken bir hata oluştu:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await AnimalService.deleteAnimal(id);
            fetchAnimals(); 
        } catch (error) {
            console.error('Hayvan silinirken bir hata oluştu:', error);
        }
    };

    return (

        <div className="container">
         <br /> 
         <h1 className="mt-3 text-center" style={{ color: "#4F4A45" }}>Hayvan Listesi</h1>
    
           <br />

            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>ID</th> 
                        <th>Hayvan Adı</th>
                        <th>Tür</th>
                        <th>Cins</th>
                        <th>Cinsiyet</th>
                        <th>Renk</th>
                        <th>Doğum Tarihi</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.id}>
                            <td>{animal.id}</td>
                            <td>{animal.name}</td>
                            <td>{animal.species}</td>
                            <td>{animal.breed}</td>
                            <td>{animal.gender}</td>
                            <td>{animal.colour}</td>
                            <td>{animal.dateOfBirth}</td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(animal)}>Düzenle</button>&nbsp;
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(animal.id)}>Sil</button>
                            </td>
                        </tr> 
                    ))}
                </tbody>

                
            </table>



            {/* ID'ye Göre Hayvan Filtreleme */}
            <input 
                type="text" 
                placeholder="ID ile Filtrele" 
                value={searchId} 
                onChange={handleIdSearchChange} 
            />
            <button onClick={handleIdSearch}>Ara</button>

            {/* İsme Göre Hayvan Filtreleme */}
            <input 
                type="text" 
                placeholder="İsim ile Filtrele" 
                value={searchName} 
                onChange={(e) => setSearchName(e.target.value)} 
            />
            <button onClick={handleNameSearch}>Ara</button>
            <br /> <br />

            {editMode ? (
                <div>
                    <h2>Hayvan Güncelle</h2> 
                    <form onSubmit={handleUpdateAnimal}>
    <div className="form-group">
        <label htmlFor="name">Hayvan Adı:</label>
        <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={editingAnimal?.name || ''} 
            onChange={(e) => setEditingAnimal({ ...editingAnimal, name: e.target.value })}
        />
    </div>
    <div className="form-group">
        <label htmlFor="species">Tür:</label>
        <input 
            type="text" 
            className="form-control" 
            id="species" 
            name="species" 
            value={editingAnimal?.species || ''}
            onChange={(e) => setEditingAnimal({ ...editingAnimal, species: e.target.value })}
        />
    </div>
    <div className="form-group">
        <label htmlFor="breed">Cins:</label>
        <input 
            type="text" 
            className="form-control" 
            id="breed" 
            name="breed" 
            value={editingAnimal?.breed || ''}
            onChange={(e) => setEditingAnimal({ ...editingAnimal, breed: e.target.value })}
        />
    </div>
    <div className="form-group gender-select-group">
    <label htmlFor="gender">Cinsiyet:</label>
    <select 
        className="form-control" 
        id="gender" 
        name="gender" 
        value={editingAnimal?.gender || ''}
        onChange={(e) => setEditingAnimal({ ...editingAnimal, gender: e.target.value })}
    >
        <option value="">Cinsiyet Seçiniz...</option>
        <option value="Male">Erkek</option>
        <option value="Female">Dişi</option>
    </select>
</div>

    <div className="form-group">
        <label htmlFor="colour">Renk:</label>
        <input 
            type="text" 
            className="form-control" 
            id="colour" 
            name="colour" 
            value={editingAnimal?.colour || ''}
            onChange={(e) => setEditingAnimal({ ...editingAnimal, colour: e.target.value })}
        />
    </div>
    <div className="form-group birthdate-group">
        <label htmlFor="dateOfBirth">Doğum Tarihi:</label>
        <input 
            type="date" 
            className="form-control date-input" 
            id="dateOfBirth" 
            name="dateOfBirth" 
            value={editingAnimal?.dateOfBirth || ''}
            onChange={(e) => setEditingAnimal({ ...editingAnimal, dateOfBirth: e.target.value })}
/>

    </div>
    <button type="submit" className="btn btn-primary" style={{ backgroundColor:  "#2D9596" }} >Kaydet</button>
                <button className="btn btn-secondary" onClick={() => { 
                    setEditingAnimal(null);
                    setEditMode(false);
                }}>Vazgeç</button>
            </form>
        </div>
    ) : (
                <button className="btn btn-primary" style={{ backgroundColor:  "#2D9596" }}  onClick={() => setEditMode(true)}>
                    Güncelle
                </button>

                
            )}
                <p>Hayvan güncellemek için tablodan düzenle butonuna tıklayın, değişiklikleri yapın ve kaydedin.</p>

<h2>Hayvan Ekleme</h2>
            <AnimalForm /> 
    
        </div>
        
        
        
    );

    
}

export default AnimalList;