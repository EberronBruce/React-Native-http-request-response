import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fectchMenu = async () => {
    try {
			const response = await fetch(
				"https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json"
			);

			// Log Request Method and Headers
			// console.log("Request Method:", response.url);
			// console.log("Request Headers:", Array.from(response.headers.entries()));
			const json = await response.json();

      setData(json.menu)

			// Log Response JSON
			// console.log("Response JSON:", JSON.stringify(json, null, 2));
		} catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fectchMenu();
  }, []);

  const Item = ({ name, price }) => (
		<View style={menuStyles.innerContainer}>
			<Text style={menuStyles.itemText}>{name}</Text>
			<Text style={menuStyles.itemText}>{'$' + price}</Text>
		</View>
	);

  const renderItem = ({ item }) => (
    <Item name={item.title} price={item.price} />
  );


  return (
		<SafeAreaView style={menuStyles.container}>
			<Text style={menuStyles.headerText}>Little Lemon</Text>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={data} //Set the data for the FlatList
					keyExtractor={(item) => item.id.toString()} // Each item has a unique "id" property
          renderItem={renderItem}
				/>
			)}
		</SafeAreaView>
	);
};

const menuStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerText: {
		color: "#495E57",
		fontSize: 30,
		textAlign: "center",
		paddingTop: 40,
	},
	innerContainer: {
		paddingHorizontal: 40,
		paddingVertical: 20,
		backgroundColor: "#495E57",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	itemText: {
		color: "#F4CE14",
		fontSize: 22,
	},
});
