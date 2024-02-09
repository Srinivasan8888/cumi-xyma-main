import { useState } from 'react';
import { Switch } from '@headlessui/react';

function Toggle({ onToggle }) {
  const [enabled, setEnabled] = useState(true);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  
  const handleToggleChange = () => {
    setEnabled(!enabled);
    onToggle(enabled); // Passes the current state of the toggle to the parent component
    setButtonEnabled(!enabled);
  };

  // const handleToggle = () => {
  //   setEnabled(!enabled);
  //   if (!enabled) {
  //     alert('Toggle turned on');
  //   } else {
  //     alert('Toggle turned off');
  //   }
  // };

  return (
    <Switch.Group>
      <div className="flex items-center mb-4 mt-4">
        <Switch
          checked={enabled}
          // onChange={handleToggle}
          onChange={handleToggleChange}
          // onChange={setEnabled}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}

export default Toggle;
