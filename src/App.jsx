import { useEffect } from "react";
import { useState } from "react";
import ImageCard from "./components/ImageCard";
import Loader from "./components/Loader";
import ImageSearch from "./components/ImageSearch";

const API_KEY = "38946077-ee36aef34edcdeaf6581805e9";
function App() {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [term, setTerm] = useState("");

	useEffect(
		function () {
			async function fetchImages() {
				const res = await fetch(
					`https://pixabay.com/api/?key=${API_KEY}&q=${term}&image_type=photo`
				);
				const data = await res.json();
				setImages(data.hits);
				setIsLoading(false);
			}
			fetchImages();
		},
		[term]
	);

	return (
		<div className="container mx-auto">
			<ImageSearch searchText={(text) => setTerm(text)}></ImageSearch>
			{!isLoading && images.length === 0 && (
				<h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
			)}
			{isLoading && <Loader />}
			<div className="grid grid-cols-3 gap-4">
				{images.map((image) => (
					<ImageCard key={image.id} image={image} />
				))}
			</div>
		</div>
	);
}

export default App;
