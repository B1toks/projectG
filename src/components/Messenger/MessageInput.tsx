import React, { useState } from 'react';

type Props = {
  onSend: (content: string) => void;
};

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed !== '') {
      onSend(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Напишіть повідомлення..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={styles.input}
      />
      <button onClick={handleSend} style={styles.button}>
        ✈️
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    borderTop: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#fff',
  },
  input: {
    flexGrow: 1,
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
    marginRight: '10px',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#4C9DD7',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default MessageInput;
