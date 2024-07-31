const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			current_user: null,
			auth: false

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			login: async (email, password) => {
				try {
					let response = await fetch(process.env.BACKEND_URL+"/api/login",{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						  })});
						  let data = await response.json()
						  if (response.ok){
							localStorage.setItem('token', data.access_token)
							setStore({current_user:data.current_user})
							return true
						  }
						  setStore({current_user: false})
						  return false
				} catch (error) {
					console.log(error);
					setStore({current_user: false})
					return false
				}},

				logout: async () => {
					localStorage.removeItem("token");
					setStore({auth:false})
					setStore({current_user:null})
					},
	
				signup: async (email, password) => {
					try {
						let response = await fetch(process.env.BACKEND_URL+"/api/signup",{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								"email": email,
								"password": password
							  })});
							  let data = await response.json()
							  if (response.ok){
								localStorage.setItem('token', data.access_token)
								return true
							  }
							  return false
					} catch (error) {
						console.log(error);
						return false
					}},

				getUserProfile: async () => {
					let token = localStorage.getItem("token");
					try {
						let response = await fetch(process.env.BACKEND_URL+"/api/profile",{
							method: 'GET',
							headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
							});
							  let data = await response.json()
							  if (response.ok){
								setStore({current_user: data.results})
								return true
							  }
							  setStore({current_user: false})
							  return false
					} catch (error) {
						console.log(error);
						setStore({current_user: false})
						return false
					}},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
