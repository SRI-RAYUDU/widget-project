import React, { useState } from 'react';
import './App.css';

// Example JSON data
const initialData = {
  categories: [
    {
      id: "1",
      name: `CSPM Executive Dashboard`,
      widgets: [
        { id: "1", name: "Widget 1", text: "This is Widget 1" },
        { id: "2", name: "Widget 2", text: "This is Widget 2" }
      ]
    },
    {
      id: "2",
      name: "CWWP Dashboard",
      widgets: [
        { id: "3", name: "Widget 3", text: "This is Widget 3" }
      ]
    }
  ]
};

function App() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: '', text: '', categoryId: '' });

  const handleAddWidget = () => {
    setShowSidebar(true);
  };

  const handleConfirmAdd = () => {
    if (!newWidget.name || !newWidget.text || !newWidget.categoryId) {
      alert('Please fill out all fields.');
      return;
    }

    const updatedCategories = data.categories.map(category => {
      if (category.id === newWidget.categoryId) {
        return {
          ...category,
          widgets: [
            ...category.widgets,
            { id: Date.now().toString(), name: newWidget.name, text: newWidget.text }
          ]
        };
      }
      return category;
    });

    setData({ ...data, categories: updatedCategories });
    setShowSidebar(false);
    setNewWidget({ name: '', text: '', categoryId: '' });
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    const updatedCategories = data.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });

    setData({ ...data, categories: updatedCategories });
  };

  const filteredData = data.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(search.toLowerCase())
    )
  }));

  return (
    <div className="app">
      <div className="navbar">
        <input
          type="text"
          placeholder="Search widgets"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-button" onClick={handleAddWidget}>+ Add Widget</button>
      </div>
      <div className="dashboard">
        {filteredData.map(category => (
          <div key={category.id} className="category">
            <h2>{category.name}</h2>
            <div className="widgets">
              {category.widgets.length > 0 ? (
                category.widgets.map(widget => (
                  <div key={widget.id} className="widget">
                    <span>{widget.name}</span>
                    <p>{widget.text}</p>
                    <button onClick={() => handleRemoveWidget(category.id, widget.id)} className="remove-button">✖</button>
                  </div>
                ))
              ) : (
                <p>No widgets found.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {showSidebar && (
        <div className="sidebar">
          <h3>Add Widget</h3>
          <label>
            Widget Name:
            <input
              type="text"
              value={newWidget.name}
              onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
            />
          </label>
          <label>
            Widget Text:
            <input
              type="text"
              value={newWidget.text}
              onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
            />
          </label>
          <label>
            Category:
            <select
              value={newWidget.categoryId}
              onChange={(e) => setNewWidget({ ...newWidget, categoryId: e.target.value })}
            >
              <option value="">Select a category</option>
              {data.categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <button onClick={handleConfirmAdd}>Confirm</button>
          <button onClick={() => setShowSidebar(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
