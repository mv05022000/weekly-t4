// Function to fetch phones based on search query
async function fetchPhones(query) {
    try {
        const response = await axios.get(`https://openapi.programming-hero.com/api/phones?search=${query}`);
        const phones = response.data;

        // Fetch phones with similar brand if search query matches a specific phone
        if (phones.length === 1) {
            const brand = phones[0].brand;
            const similarBrandPhonesResponse = await axios.get(`https://openapi.programming-hero.com/api/phones?search=${brand}`);
            const similarBrandPhones = similarBrandPhonesResponse.data.filter(phone => phone.id !== phones[0].id);
            return [...phones, ...similarBrandPhones];
        }

        return phones;
    } catch (error) {
        console.error('Error fetching phones:', error);
        return [];
    }
}
