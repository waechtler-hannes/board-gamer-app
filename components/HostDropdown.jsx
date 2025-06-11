import { useState } from 'react'
import { Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Ionicons } from '@expo/vector-icons'

//Hooks
import { useHosts } from '../hooks/useHosts'

export default function HostDropdown({ value, setValue, style }) {
  const { hosts } = useHosts()
  const [isFocus, setIsFocus] = useState(false)
  const hostOptions = hosts.map(host => ({ label: host.name, value: host.$id }))
  return (
    <>
      <Text style={style.heading}>Host</Text>
      <Dropdown
        style={[style.input, isFocus && style.inputActive]}
        data={hostOptions}
        maxHeight={300}
        selectedTextStyle={style.inputText}
        placeholderStyle={[style.inputText, style.placeholder]}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Host auswählen' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => { setValue(item.value); setIsFocus(false); }}
        renderRightIcon={() => (
          <Ionicons name="chevron-down" size={20} color="#888" style={{ marginLeft: 8 }} />
        )}
      />
    </>
  )
}