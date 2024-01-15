// auth file for api calls to backend with @tanstack/react-query and mutation et redux mais pas de axios

const BASE_URL = 'URL_DE_VOTRE_API';

/*
    const { mutate, error, isSuccess } = useMutation(loginUser, {
        onSuccess: (data) => {
            // Ici, data contiendra le token JWT et les informations de l'utilisateur
            dispatch(setUsername(data.user.name)); // Exemple d'utilisation de Redux
            // Tu peux également stocker le token JWT dans le localStorage ou un cookie ici
        },
        // Ajouter d'autres handlers comme onError si nécessaire
    });
*/


export const loginUser = async (data: { email: string; password: string; JWT: string; }) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
}

