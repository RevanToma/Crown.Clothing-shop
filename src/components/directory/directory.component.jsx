import { DirectoryContainer } from "./directory.style";
import DirectoryItem from "../directory-item/directory-item.component";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading } from "../../store/categories/category.selector";
import Spinner from "../spinner/spinner.component";

const categories = [
  {
    id: 1,
    title: "Hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    route: "shop/hats",
  },
  {
    id: 2,
    title: "Jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    route: "shop/jackets",
  },
  {
    id: 3,
    title: "Sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    route: "shop/sneakers",
  },
  {
    id: 4,
    title: "Womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    route: "shop/womens",
  },
  {
    id: 5,
    title: "Mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    route: "shop/mens",
  },
];

const Directory = () => {
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <DirectoryContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        categories.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))
      )}
    </DirectoryContainer>
  );
};

export default Directory;
