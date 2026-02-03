import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { categoryAPI } from '../../api/apiCategoryNew';
import type { CategoryData } from '../../api/apiCategoryNew';

interface Category {
  _id: string;
  name: string;
  image: string;
  description?: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      console.log('Categories response:', response);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]);
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        image: null
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        image: null
      });
    }
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: null });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory._id, {
          name: formData.name,
          description: formData.description,
          image: formData.image || undefined
        });
      } else {
        await categoryAPI.create({
          name: formData.name,
          description: formData.description,
          image: formData.image || undefined
        });
      }

      handleCloseModal();
      fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryAPI.delete(id);
        fetchCategories();
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
        >
          <FaPlus />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group">
            <div className="relative h-48">
              {category.image ? (
                <img
                  src={category.image.startsWith('http') ? category.image : `http://localhost:7000${category.image}`}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log('Image loaded:', category.name)}
                  onError={(e) => {
                    console.log('Image failed to load:', category.name, category.image);
                    e.currentTarget.src = `https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=${encodeURIComponent(category.name)}`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <FaImage className="text-blue-400 text-4xl" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <FaImage className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">No categories found</p>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Category
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter category description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                        <FaImage className="text-gray-400 text-3xl mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.image ? formData.image.name : 'Click to upload image'}
                        </p>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                >
                  {loading ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
