const mainUrl = 'https://ecommerce-backend-yuvi.vercel.app'; //The Deployed Backend URL

export const fetchProducts = async () => {
    const response = await fetch(`${mainUrl}/products `);
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    // console.log(response)

    const data = await response.json();
    return data;
}

export const fetchSingleProduct = async (id) => {
    const response = await fetch(`${mainUrl}/products/${id} `);
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    // console.log(response)

    const data = await response.json();
    return data;
}


export const fetchCartData = async (id) => {

    const response = await fetch(`${mainUrl}/cart`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: id })
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    const data = await response.json();
    // console.log("fetchCartData response", data)
    return data;
}

export const updateCartData = async (cart) => {
    // console.log("updateCartData", cart.items, cart.totalQuantity);
    const theBody = JSON.stringify({
        id: cart._id,
        items: cart.items,
        totalQuantity: cart.totalQuantity,
    })
    // console.log(theBody);
    await fetch(`${mainUrl}/cart`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            body: theBody
        }
    );
}

export const createUser = async (formData) => {

    const theBody = JSON.stringify({
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        email: formData.email,
        password: formData.password,
        userID: formData.userID

    })
    const response = await fetch(`${mainUrl}/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',

            },
            body: theBody
        }
    );
    const theResponse = response.json();
    return theResponse
}

export const loginUser = async (formData) => {

    const theBody = JSON.stringify({
        email: formData.email,
        password: formData.password

    })

    const response = await fetch(`${mainUrl}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',

            },
            body: theBody
        }
    );
    const data = await response.json();
    // console.log("Data from LoginUser",data)
    return data

}

export const checkTokenValidity = async (token) => {
    const response = await fetch(`${mainUrl}/auth`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": 'Bearer ' + token
            }
        }
    );

    const tokenKey = (await response.json())
    // console.log(tokenKey);
    return tokenKey;
}

export const checkOut = async (formData, userId) => {
    const theBody = JSON.stringify({
        userID: userId,
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        email: formData.email,
        PrimaryAddress: formData.Address,
        BackUpAddress: formData.BackUpAddress
    })

    const response = await fetch(`${mainUrl}/checkout`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',

            },
            body: theBody
        }
    );
    if (!response.ok) {
        return null
    }

    const repData = await response.json()
    return repData
}

export const contactEmail = async (data) => {

    const theBody = JSON.stringify({
        email: data.email,
        author: data.author,
        message: data.message
    })

    const response = await fetch(`${mainUrl}/contact`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',

            },
            body: theBody
        }
    );
    if (!response.status) {
        return null
    }

    const repData = await response.json()
    return repData

}