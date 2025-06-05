"use client"

import { useState, useRef, useCallback } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MaterialCard } from "@/components/tasks/MaterialCard"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, UploadCloud } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import clsx from "clsx"
import { useRouter } from "next/navigation"




export default function TopicPage({ isTeacher = false }: { isTeacher?: boolean }) {
  // const [commentEnabled, setCommentEnabled] = useState(true)
  // const [fileUploadEnabled, setFileUploadEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("materials")
  const [activeTopic, setActiveTopic] = useState("Тема 4: Назва")
  const [markedAsDone, setMarkedAsDone] = useState(false)



  const [isEditing, setIsEditing] = useState(false)
  const [materials, setMaterials] = useState([
    { type: "file" as "file" | "video", name: "Презентація Назва" },
    { type: "video" as "file" | "video", name: "Відео Назва" },
    { type: "file" as "file" | "video", name: "PDF Назва" },
  ])
  const [materialsBackup, setMaterialsBackup] = useState([...materials])
  const [newMaterial, setNewMaterial] = useState({ type: "file" as "file" | "video", name: "" })

  const [isDragOver, setIsDragOver] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddMaterial = () => {
    if (newMaterial.name.trim()) {
      setMaterials((prev) => [...prev, newMaterial])
      setNewMaterial({ type: "file", name: "" })
    }
  }

  const handleDelete = (index: number) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index))
  }

  const handleEdit = (index: number) => {
    const edited = prompt("Нова назва", materials[index].name)
    if (edited !== null && edited.trim()) {
      const updated = [...materials]
      updated[index].name = edited
      setMaterials(updated)
    }
  }

  const statuses = [
    { value: "materials", label: "Матеріали" },
    { value: "tasks", label: "Завдання" },
  ]

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      console.log("Отримано файл:", file)
    }
  }, [])

  const handleClickDropzone = () => {
    fileInputRef.current?.click()
  }

  const router = useRouter();

  return (
    <div className="flex flex-col  min-h-screen pl-20 pt-12">
      <div className="px-4 pt-2 pb-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">{activeTopic}</h2>
      </div>
      <div className="flex items-center gap-2 px-4 pb-4">
        <Button size="icon" variant="ghost"  onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        {statuses.map((status) => (
          <Button
            key={status.value}
            variant={activeTab === status.value ? "default" : "outline"}
            onClick={() => setActiveTab(status.value)}
            className="capitalize"
          >
            {status.label}
          </Button>
        ))}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-64 w-full pr-4 lg:pr-4 px-4 lg:px-0">
          <Card className="w-full p-2 dark:bg-zinc-900">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {[...Array(11)].map((_, i) => {
                  const topic = `Тема ${i + 1}: Назва`
                  return (
                    <Button
                      key={i}
                      variant={activeTopic === topic ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTopic(topic)}
                    >
                      {topic}
                    </Button>
                  )
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>

        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {activeTab === "materials" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-black dark:text-white">Матеріали</h3>
                {!isTeacher && (
                  <div className="flex items-center gap-2">
                    <Checkbox id="done-materials" checked={markedAsDone} onCheckedChange={(val) => setMarkedAsDone(Boolean(val))} />
                    <Label htmlFor="done-materials" className="text-black dark:text-white">Позначити як виконане</Label>
                  </div>
                )}
                {isTeacher && (
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Редагувати матеріали
                      </Button>
                    ) : (
                      <>
                        <Button variant="secondary" onClick={() => { setIsEditing(false); setMaterials(materialsBackup) }}>
                          Скасувати
                        </Button>
                        <Button onClick={() => { setIsEditing(false); setMaterialsBackup([...materials]) }}>
                          Зберегти
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4">
                {materials.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 w-full rounded p-0">
                    <div className="flex-1">
                      <MaterialCard type={m.type} name={m.name} />
                    </div>
                    {isTeacher && isEditing && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(idx)}>
                          ✏️
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(idx)}>
                          🗑️
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {isTeacher && isEditing && (
                  <div className="mt-4 space-y-2">
                    <Label className="text-black dark:text-white">Тип матеріалу</Label>
                    <select
                      value={newMaterial.type}
                      onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value as "file" | "video" })}
                      className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded w-full text-black dark:text-white"
                    >
                      <option value="file">Файл</option>
                      <option value="video">Відео</option>
                    </select>

                    <Label className="text-black dark:text-white">Назва</Label>
                    <Input
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                      placeholder="Назва матеріалу"
                      className="bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
                    />

                    <Button onClick={handleAddMaterial}>Додати</Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-4">
              <Card className="p-4 space-y-1 dark:bg-zinc-800 bg-zinc-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-black dark:text-white text-xl">Домашня робота</h3>
                  {!isTeacher && (
                    <div className="flex items-center gap-2">
                      <Checkbox id="done" checked={markedAsDone} onCheckedChange={(val) => setMarkedAsDone(Boolean(val))} />
                      <Label htmlFor="done" className="text-black dark:text-white">Позначити як виконане</Label>
                    </div>
                  )}
                </div>

                <p className="text-black dark:text-white">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit...
                </p>

                <div>
                  <h4 className="text-black dark:text-white font-semibold text-xl">Завантажити файл</h4>
                </div>

                <div>
                  <p className="text-black dark:text-white">Завантажте виконану роботу і додайте короткий опис:</p>
                </div>

                <div>
                  <p className="text-black dark:text-white">Максимальна кількість балів: 10</p>
                </div>

                <div
                  onClick={handleClickDropzone}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                  onDragLeave={() => setIsDragOver(false)}
                  className={clsx(
                    "flex flex-col items-center justify-center gap-2 border border-dashed transition p-6 rounded-xl cursor-pointer text-center",
                    "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white",
                    isDragOver ? "border-blue-400 bg-blue-100 dark:bg-zinc-700" : "border-zinc-400 dark:border-zinc-500"
                  )}
                >
                  <UploadCloud className="w-8 h-8 text-zinc-500 dark:text-zinc-300" />
                  <span className="text-sm">Перетягніть файл сюди або натисніть для вибору</span>
                  <Input id="upload" type="file" className="hidden" ref={fileInputRef} />
                </div>

                <p className="text-black dark:text-white text-sm">Максимальна вага файлу: 100 мб.</p>

                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-black dark:text-white">Коментар</Label>
                  <Textarea id="comment" placeholder="Ваш коментар..." className="bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white" />
                </div>

                <Button className="mt-4">Відправити</Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
