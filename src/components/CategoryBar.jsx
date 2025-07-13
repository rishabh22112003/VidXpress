import { Button } from "react-bootstrap";

const categories = ["Trending", "Music", "Tech", "Gaming", "News", "AI", "Coding", "Motivation"];

const CategoryBar = ({ onCategorySelect, selectedCategory }) => {
    return (
        <div className="d-flex gap-2 flex-wrap mb-3">
            {categories.map((category, index) => (
                <Button
                    key={index}
                    className={`category-btn ${category === selectedCategory ? "active-category" : ""}`}
                    onClick={() => onCategorySelect(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
};

export default CategoryBar;
