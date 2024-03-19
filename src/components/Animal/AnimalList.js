import React, { useState, useEffect } from 'react';
import { AnimalService } from '../../services/AnimalService';
import './AnimalList.css'; // CSS stil dosyanızı ekleyin

function AnimalList() {
    const [animals, setAnimals] = useState([]);
    const [newAnimal, setNewAnimal] = useState({
        name: '',
        species: '',
        breed: '',
        gender: '',
        colour: '',
        dateOfBirth: '',
        customerId: '' // Müşteri ID
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

        // İsme göre hayvan arama fonksiyonu
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
        if (searchId) { // Bir ID girildiyse
            try {
                const animal = await AnimalService.getAnimalById(searchId);
                if (animal) {
                    setAnimals([animal]); // Tek hayvanın olduğu bir array set et
                } else {
                   // ... ID bulunamadığında yapılacak işlem
                }
            } catch (error) {
                // ... Hata mesajı ve işlemleri
            }
        } else {
            fetchAnimals(); // ID yoksa tüm hayvanları getir
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
            // Örnek olarak customerId'yi statik olarak belirtiyorum
            const customerId = '123'; // Gerçek uygulamada bu, seçili veya giriş yapmış müşterinin ID'si olmalı
            const response = await AnimalService.createAnimal(newAnimal, customerId);
            console.log('Yeni hayvan başarıyla oluşturuldu:', response);
            // Başarılı işlem sonrası yapılacaklar (örneğin durumu güncelleme veya sayfayı yenileme)
        } catch (error) {
            console.error('Hayvan oluşturma işlemi başarısız:', error);
            // Hata durumunda yapılacak işlemler
        }
    };

    const handleEditClick = (animal) => {
        setEditingAnimal({ ...animal }); // Tüm bilgilerle güncelleme
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
            fetchAnimals(); // Silme işleminden sonra hayvan listesini güncelleyin
        } catch (error) {
            console.error('Hayvan silinirken bir hata oluştu:', error);
        }
    };

    return (

        <div className="container">
            <h1>Hayvan Listesi</h1>

            <div className="form-group">
        <label htmlFor="name">Hayvan Adı:</label>
        <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            placeholder="Hayvan Adı" 
            value={newAnimal.name}
            onChange={handleInputChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="species">Tür:</label>
        <input 
            type="text" 
            className="form-control" 
            id="species" 
            name="species" 
            placeholder="Tür" 
            value={newAnimal.species}
            onChange={handleInputChange}
        />
    </div>

            

            <div className="form-group">
    <label htmlFor="breed">Cins:</label>
    <input 
        type="text" 
        className="form-control" 
        id="breed" 
        name="breed" 
        placeholder="Cins" 
        value={newAnimal.breed}
        onChange={handleInputChange}
    />
</div>

<div className="form-group">
    <label htmlFor="gender">Cinsiyet:</label>
    <select 
        className="form-control" 
        id="gender" 
        name="gender" 
        value={newAnimal.gender}
        onChange={handleInputChange}
    >
        <option value="">Seçiniz...</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
</div>

<div className="form-group">
    <label htmlFor="colour">Renk:</label>
    <input 
        type="text" 
        className="form-control" 
        id="colour" 
        name="colour" 
        placeholder="Renk" 
        value={newAnimal.colour}
        onChange={handleInputChange}
    />
</div>

<div className="form-group">
    <label htmlFor="dateOfBirth">Doğum Tarihi:</label>
    <input 
        type="date" 
        className="form-control" 
        id="dateOfBirth" 
        name="dateOfBirth" 
        value={newAnimal.dateOfBirth}
        onChange={handleInputChange}
    />
</div>

<div className="form-group">
    <label htmlFor="customerId">Müşteri ID:</label>
    <input 
        type="text" 
        className="form-control" 
        id="customerId" 
        name="customerId" 
        placeholder="Müşteri ID" 
        value={newAnimal.customerId}
        onChange={handleInputChange}
    />
</div>

<button type="submit" className="btn btn-primary">Kaydet</button>




                        {/* Yeni Hayvan Ekleme Formu */}
                        <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Hayvan Adı"
                    value={newAnimal.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="species"
                    placeholder="Tür"
                    value={newAnimal.species}
                    onChange={handleInputChange}
                />
                {/* ... Diğer alanlar ... */}
                <input
                    type="text"
                    name="customerId"
                    placeholder="Müşteri ID"
                    value={newAnimal.customerId}
                    onChange={handleInputChange}
                />
                <button type="submit">Kaydet</button>
            </form>

            {/* Yeni Hayvan Ekleme Formu */}
            <form onSubmit={handleAddAnimal}>
                {/* Form alanları */}
                {/* Örnek bir form alanı */}
                <div className="form-group">
                    <label htmlFor="name">Hayvan Adı:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={newAnimal.name} 
                        onChange={handleInputChange}
                    />
                </div>
                {/* ... (Diğer form alanları) */}
                <button type="submit" className="btn btn-primary">Kaydet</button>
            </form>


            {editMode ? (
                <div>
                    <h2>Hayvan Güncelle</h2> {/* Burada, başlık ve butonları gerektiği şekilde düzenleyebilirsiniz */}
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
    <div className="form-group">
        <label htmlFor="gender">Cinsiyet:</label>
        <select 
            className="form-control" 
            id="gender" 
            name="gender" 
            value={editingAnimal?.gender || ''}
            onChange={(e) => setEditingAnimal({ ...editingAnimal, gender: e.target.value })}
        >
            <option value="">Cinsiyet Seçiniz...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
    <div className="form-group">
        <label htmlFor="dateOfBirth">Doğum Tarihi:</label>
        <input 
            type="date" 
            className="form-control" 
            id="dateOfBirth" 
            name="dateOfBirth" 
            value={editingAnimal?.dateOfBirth || ''}
            onChange={(e) => setEditingAnimal({ ...editingAnimal, dateOfBirth: e.target.value })}
        />
    </div>
    <button type="submit" className="btn btn-primary">Kaydet</button>
    <button className="btn btn-secondary" onClick={() => { 
        setEditingAnimal(null);
        setEditMode(false);
    }}>Vazgeç</button>
</form>
                </div> 
            ) : (
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                    Yeni Hayvan Ekle
                </button>
            )}

            <br /> <br />

            <table className="table table-striped">
                <thead>
                    <tr>{/* Tablonun başlıkları */}
                    <th>ID</th> {/* Tabloya ID sütunu ekledik */}
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
                            <td>{animal.id}</td> {/* ID'yi tabloya ekledik */}
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

            {/* Hayvan Listesi Tablosu */}
            <table className="table table-striped">
                {/* Tablo başlıkları ve içerik */}
            </table>
        </div>
        
        
        
    );
}

export default AnimalList;
