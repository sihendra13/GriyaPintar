import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Step1 from './screens/Step1'
import Step2 from './screens/Step2'
import Step3 from './screens/Step3'
import Step4 from './screens/Step4'
import Step5 from './screens/Step5'
import Step6 from './screens/Step6'
import Step7 from './screens/Step7'
import ChatScreen from './screens/ChatScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
        <Route path="/step5" element={<Step5 />} />
        <Route path="/step6" element={<Step6 />} />
        <Route path="/step7/:id" element={<Step7 />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
