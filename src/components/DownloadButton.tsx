"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface DownloadButtonProps {
  className?: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ className }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      toast({
        title: "Preparing Portfolio PDF",
        description: "Please wait while we generate your comprehensive portfolio...",
        duration: 3000,
      })

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15
      const contentWidth = pageWidth - margin * 2

      const addPageHeader = (title: string) => {
        pdf.setFillColor(26, 83, 92) // moduno-navy
        pdf.rect(0, 0, pageWidth, 25, "F")

        pdf.setTextColor(255, 255, 255)
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(14)
        pdf.text(title, pageWidth / 2, 15, { align: "center" })

        pdf.setDrawColor(78, 205, 196) // moduno-blue
        pdf.setLineWidth(0.5)
        pdf.line(margin, 25, pageWidth - margin, 25)
      }

      const addSectionTitle = (title: string, yPosition: number) => {
        pdf.setTextColor(26, 83, 92) // moduno-navy
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(14)
        pdf.text(title, margin, yPosition)

        pdf.setDrawColor(78, 205, 196) // moduno-blue
        pdf.setLineWidth(0.5)
        pdf.line(margin, yPosition + 1, margin + pdf.getTextWidth(title), yPosition + 1)

        return yPosition + 10
      }

      const addTextBlock = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(fontSize)
        pdf.setTextColor(60, 60, 60) // dark gray

        const lines = pdf.splitTextToSize(text, maxWidth)
        pdf.text(lines, x, y)

        return y + lines.length * (fontSize * 0.352)
      }

      // ===== COVER PAGE =====
      pdf.setFillColor(26, 83, 92) // moduno-navy
      pdf.rect(0, 0, pageWidth, pageHeight, "F")

      pdf.setFillColor(78, 205, 196, 0.1) // moduno-blue with transparency
      pdf.circle(pageWidth - margin, margin, 40, "F")
      pdf.circle(margin, pageHeight - margin, 30, "F")

      pdf.setTextColor(78, 205, 196) // moduno-blue
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(36)
      pdf.text("MODUNO", pageWidth / 2, pageHeight / 2 - 30, { align: "center" })

      pdf.setTextColor(255, 255, 255) // white
      pdf.setFontSize(18)
      pdf.text("PORTFOLIO", pageWidth / 2, pageHeight / 2 - 10, { align: "center" })

      pdf.setDrawColor(78, 205, 196) // moduno-blue
      pdf.setLineWidth(0.5)
      pdf.line(pageWidth / 2 - 30, pageHeight / 2, pageWidth / 2 + 30, pageHeight / 2)

      pdf.setFontSize(12)
      pdf.setFont("helvetica", "normal")
      pdf.text("3D Rendering & Civil Engineering Services", pageWidth / 2, pageHeight / 2 + 15, { align: "center" })

      pdf.setFontSize(10)
      pdf.text("By Banusha Balasubramaniyam", pageWidth / 2, pageHeight / 2 + 30, { align: "center" })

      pdf.setFontSize(8)
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      pdf.text(`Generated on: ${currentDate}`, pageWidth / 2, pageHeight - 20, { align: "center" })

      // ===== ABOUT PAGE =====
      pdf.addPage()
      addPageHeader("ABOUT ME")

      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        let yPos = 40

        // Capture profile image with PNG and proper alignment, no shadow
        const profileImage = aboutSection.querySelector("img")
        if (profileImage) {
          const profileCanvas = await html2canvas(profileImage, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: null, // preserve transparency
          })

          const profileImgData = profileCanvas.toDataURL("image/png")

          // Border around profile image
          pdf.setDrawColor(78, 205, 196) // moduno-blue
          pdf.setLineWidth(0.5)
          pdf.roundedRect(margin, yPos, 50, 50, 2, 2, "S")

          // Profile image inside border
          pdf.addImage(profileImgData, "PNG", margin + 0.5, yPos + 0.5, 49, 49)
        }

        const nameElement = aboutSection.querySelector("h3")
        const name = nameElement ? nameElement.textContent : "Banusha Balasubramaniyam"
        const titleElement = aboutSection.querySelector("h3 + p")
        const title = titleElement ? titleElement.textContent : "Founder & Lead Designer"

        pdf.setTextColor(26, 83, 92) // moduno-navy
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(16)
        pdf.text(name || "", margin + 60, yPos + 15)

        pdf.setTextColor(78, 205, 196) // moduno-blue
        pdf.setFontSize(12)
        pdf.text(title || "", margin + 60, yPos + 25)

        const bioElement = aboutSection.querySelector("p.text-gray-700.mb-6")
        const bio = bioElement ? bioElement.textContent : ""

        yPos = addTextBlock(bio || "", margin + 60, yPos + 35, contentWidth - 60)

        yPos = addSectionTitle("Education", yPos + 15)

        const educationItems = aboutSection.querySelectorAll("ul.list-disc li")
        educationItems.forEach((item) => {
          const bulletX = margin + 5
          const textX = margin + 10

          pdf.setFillColor(78, 205, 196)
          pdf.circle(bulletX, yPos + 2, 1.5, "F")

          yPos = addTextBlock(item.textContent || "", textX, yPos, contentWidth - 10)
          yPos += 5
        })

        yPos = addSectionTitle("Skills", yPos + 10)

        const skillItems = aboutSection.querySelectorAll(".flex.flex-wrap.gap-3 span")
        const skills = Array.from(skillItems).map((item) => item.textContent)

        let skillX = margin
        yPos += 5

        skills.forEach((skill) => {
          if (!skill) return
          const skillWidth = pdf.getTextWidth(skill) + 10

          if (skillX + skillWidth > pageWidth - margin) {
            skillX = margin
            yPos += 12
          }

          pdf.setFillColor(26, 83, 92)
          pdf.roundedRect(skillX, yPos - 5, skillWidth, 10, 3, 3, "F")

          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(8)
          pdf.text(skill, skillX + 5, yPos)

          skillX += skillWidth + 5
        })
      }

      // ===== PORTFOLIO PAGES =====
      pdf.addPage()
      addPageHeader("PORTFOLIO")

      const portfolioSection = document.getElementById("portfolio")
      if (portfolioSection) {
        const projectElements = portfolioSection.querySelectorAll(".grid > div")

        let yPosition = 40

        for (let i = 0; i < projectElements.length; i++) {
          const project = projectElements[i]

          if (yPosition > pageHeight - 60) {
            pdf.addPage()
            addPageHeader("PORTFOLIO (CONTINUED)")
            yPosition = 40
          }

          pdf.setDrawColor(220, 220, 220)
          pdf.setLineWidth(0.3)
          pdf.roundedRect(margin, yPosition, contentWidth, 55, 3, 3, "S")

          // Try to find image or video element
          const projectImage = project.querySelector("img")
          const projectVideo = project.querySelector("video")
          
          if (projectImage) {
            try {
              const projectCanvas = await html2canvas(projectImage, {
                scale: 2,
                useCORS: true,
                logging: false,
              })

              const projectImgData = projectCanvas.toDataURL("image/jpeg", 1.0)
              pdf.addImage(projectImgData, "JPEG", margin + 5, yPosition + 5, 45, 45)
            } catch (error) {
              console.error("Error capturing image:", error)
              // Add placeholder for failed image
              pdf.setFillColor(200, 200, 200)
              pdf.roundedRect(margin + 5, yPosition + 5, 45, 45, 3, 3, "F")
              pdf.setTextColor(100, 100, 100)
              pdf.setFontSize(8)
              pdf.text("Image", margin + 27, yPosition + 27, { align: "center" })
            }
          } else if (projectVideo) {
            try {
              // For videos, we'll create a placeholder with video icon
              pdf.setFillColor(78, 205, 196) // moduno-blue
              pdf.roundedRect(margin + 5, yPosition + 5, 45, 45, 3, 3, "F")
              
              // Add video icon
              pdf.setTextColor(255, 255, 255)
              pdf.setFontSize(16)
              pdf.text("▶", margin + 27, yPosition + 27, { align: "center" })
              
              pdf.setTextColor(255, 255, 255)
              pdf.setFontSize(6)
              pdf.text("VIDEO", margin + 27, yPosition + 35, { align: "center" })
            } catch (error) {
              console.error("Error creating video placeholder:", error)
              // Fallback placeholder
              pdf.setFillColor(200, 200, 200)
              pdf.roundedRect(margin + 5, yPosition + 5, 45, 45, 3, 3, "F")
              pdf.setTextColor(100, 100, 100)
              pdf.setFontSize(8)
              pdf.text("Video", margin + 27, yPosition + 27, { align: "center" })
            }
          } else {
            // No image or video found, add placeholder
            pdf.setFillColor(200, 200, 200)
            pdf.roundedRect(margin + 5, yPosition + 5, 45, 45, 3, 3, "F")
            pdf.setTextColor(100, 100, 100)
            pdf.setFontSize(8)
            pdf.text("Media", margin + 27, yPosition + 27, { align: "center" })
          }

          const titleElement = project.querySelector("h3")
          const title = titleElement ? titleElement.textContent : ""

          const descriptionElement = project.querySelector("p")
          const description = descriptionElement ? descriptionElement.textContent : ""

          const categoryElements = project.querySelectorAll(".flex.gap-2 span")
          const categories = Array.from(categoryElements)
            .map((item) => item.textContent)
            .join(", ")

          pdf.setTextColor(26, 83, 92) // moduno-navy
          pdf.setFont("helvetica", "bold")
          pdf.setFontSize(12)
          pdf.text(title || "", margin + 55, yPosition + 15)

          pdf.setTextColor(60, 60, 60) // dark gray
          pdf.setFont("helvetica", "normal")
          pdf.setFontSize(9)
          const descLines = pdf.splitTextToSize(description || "", contentWidth - 60)
          pdf.text(descLines, margin + 55, yPosition + 25)

          pdf.setTextColor(78, 205, 196) // moduno-blue
          pdf.setFontSize(8)
          pdf.text(categories, margin + 55, yPosition + 45)

          yPosition += 65
        }
      }

      // ===== CONTACT PAGE =====
      pdf.addPage()
      addPageHeader("CONTACT INFORMATION")

      const contactSection = document.getElementById("contact")
      if (contactSection) {
        let yPos = 40

        pdf.setTextColor(60, 60, 60)
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10)
        pdf.text("Get in touch with us for inquiries, collaborations, or to discuss your project needs:", margin, yPos)

        yPos += 15

        const contactItems = contactSection.querySelectorAll("ul.space-y-5 li")

        contactItems.forEach((item) => {
          const contactText = item.textContent?.trim()
          if (contactText) {
            pdf.setFillColor(245, 245, 245)
            pdf.roundedRect(margin, yPos - 5, contentWidth, 15, 2, 2, "F")

            pdf.setFillColor(26, 83, 92)
            pdf.circle(margin + 7, yPos + 2, 3, "F")

            pdf.setTextColor(60, 60, 60)
            pdf.setFontSize(10)
            pdf.text(contactText, margin + 15, yPos + 3)

            yPos += 20
          }
        })

        const quoteElement = contactSection.querySelector(".bg-moduno-navy p")
        const quote = quoteElement ? quoteElement.textContent : ""

        if (quote) {
          yPos += 10

          pdf.setFillColor(15, 44, 51)
          pdf.roundedRect(margin, yPos, contentWidth, 25, 3, 3, "F")

          pdf.setTextColor(78, 205, 196, 0.3)
          pdf.setFont("helvetica", "bold")
          pdf.setFontSize(30)
          pdf.text('"', margin + 10, yPos + 15)
          pdf.text('"', pageWidth - margin - 10, yPos + 15, { align: "right" })

          pdf.setTextColor(200, 200, 200)
          pdf.setFontSize(10)
          pdf.setFont("helvetica", "italic")
          pdf.text(quote, pageWidth / 2, yPos + 15, { align: "center" })
        }

        yPos = pageHeight - 30

        pdf.setDrawColor(78, 205, 196)
        pdf.setLineWidth(0.5)
        pdf.line(margin, yPos, pageWidth - margin, yPos)

        pdf.setTextColor(26, 83, 92)
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(8)
        pdf.text("Moduno PVT Ltd ©️ " + new Date().getFullYear(), margin, yPos + 10)

        pdf.setTextColor(78, 205, 196)
        pdf.text("www.moduno.com", pageWidth - margin, yPos + 10, { align: "right" })
      }

      // Add table of contents as the second page
      const totalPages = pdf.getNumberOfPages()
      pdf.insertPage(2)

      addPageHeader("CONTENTS")

      let tocY = 50

      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(12)
      pdf.setTextColor(26, 83, 92)

      const tocEntries = [
        { title: "About Me", page: 3 },
        { title: "Portfolio", page: 4 },
        { title: "Contact Information", page: totalPages },
      ]

      tocEntries.forEach((entry) => {
        pdf.text(entry.title, margin, tocY)

        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10)
        pdf.setTextColor(150, 150, 150)

        const titleWidth = pdf.getTextWidth(entry.title)
        const pageNumWidth = pdf.getTextWidth(entry.page.toString())
        const dotsWidth = pageWidth - margin * 2 - titleWidth - pageNumWidth - 5

        let dots = ""
        const dotChar = "."
        const singleDotWidth = pdf.getTextWidth(dotChar)
        const numberOfDots = Math.floor(dotsWidth / singleDotWidth)

        for (let i = 0; i < numberOfDots; i++) {
          dots += dotChar
        }

        pdf.text(dots, margin + titleWidth + 2, tocY)

        pdf.setTextColor(78, 205, 196)
        pdf.setFont("helvetica", "bold")
        pdf.text(entry.page.toString(), pageWidth - margin, tocY, { align: "right" })

        tocY += 15
      })

      pdf.save("Moduno_Portfolio_2025.pdf")

      toast({
        title: "Download Complete",
        description: "Your professional portfolio has been downloaded successfully.",
        duration: 5000,
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download Failed",
        description: "An error occurred during the download. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      className={`bg-moduno-blue text-moduno-navy hover:bg-white transition-colors shadow-lg ${className}`}
      disabled={isDownloading}
      size="lg"
    >
      {isDownloading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Generating PDF...
        </span>
      ) : (
        <span className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Portfolio
        </span>
      )}
    </Button>
  )
}

export default DownloadButton
