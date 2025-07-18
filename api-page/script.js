// ===============================================
// YEON UI - Modern API Documentation JavaScript
// ===============================================

// Import Bootstrap
const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const elements = {
    // Loading
    loadingScreen: document.getElementById("loadingScreen"),

    // Sidebar
    sidebar: document.getElementById("sidebar"),
    sidebarToggle: document.getElementById("sidebarToggle"),
    mobileMenuToggle: document.getElementById("mobileMenuToggle"),
    sidebarTitle: document.getElementById("sidebarTitle"),
    sidebarVersion: document.getElementById("sidebarVersion"),

    // Theme
    themeToggle: document.getElementById("themeToggle"),

    // Search
    searchInput: document.getElementById("searchInput"),
    clearSearch: document.getElementById("clearSearch"),

    // Header
    notificationBtn: document.getElementById("notificationBtn"),
    notificationBadge: document.getElementById("notificationBadge"),
    statusIndicator: document.getElementById("statusIndicator"),
    statusText: document.getElementById("statusText"),

    // Hero
    heroTitle: document.getElementById("heroTitle"),
    heroDescription: document.getElementById("heroDescription"),
    heroImage: document.getElementById("heroImage"),
    totalAPIs: document.getElementById("totalAPIs"),
    totalCategories: document.getElementById("totalCategories"),

    // APIs
    categoryFilter: document.getElementById("categoryFilter"),
    apiGrid: document.getElementById("apiGrid"),
    noResults: document.getElementById("noResults"),

    // Modal
    apiModal: document.getElementById("apiModal"),
    modalTitle: document.getElementById("modalTitle"),
    modalDescription: document.getElementById("modalDescription"),
    endpointCode: document.getElementById("endpointCode"),
    parametersSection: document.getElementById("parametersSection"),
    parametersContainer: document.getElementById("parametersContainer"),
    testBtn: document.getElementById("testBtn"),
    responseSection: document.getElementById("responseSection"),
    loadingResponse: document.getElementById("loadingResponse"),
    responseCode: document.getElementById("responseCode"),
    copyEndpoint: document.getElementById("copyEndpoint"),
    copyResponse: document.getElementById("copyResponse"),

    // Toast
    notificationToast: document.getElementById("notificationToast"),
  }

  // Global variables
  let settings = {}
  let currentApiData = null
  let allApis = []
  let filteredApis = []
  let currentCategory = "all"

  // Initialize Bootstrap components
  const toastInstance = new bootstrap.Toast(elements.notificationToast)
  const modalInstance = new bootstrap.Modal(elements.apiModal)

  // ===============================================
  // INITIALIZATION
  // ===============================================

  async function initialize() {
    try {
      // Load settings
      await loadSettings()

      // Setup UI
      setupEventListeners()
      initializeTheme()
      populateContent()
      renderCategories()
      renderApis()

      // Hide loading screen
      hideLoadingScreen()

      // Show notification
      showToast("Welcome to Yeon UI! 🌟", "success")
    } catch (error) {
      console.error("Initialization error:", error)
      showToast("Failed to load API data", "error")
      hideLoadingScreen()
    }
  }

  // ===============================================
  // SETTINGS LOADING
  // ===============================================

  async function loadSettings() {
    try {
      const response = await fetch("/src/settings.json")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      settings = await response.json()

      // Process APIs
      allApis = []
      settings.categories.forEach((category) => {
        category.items.forEach((api) => {
          allApis.push({
            ...api,
            category: category.name,
            categoryColor: category.color,
            categoryIcon: category.icon,
          })
        })
      })

      filteredApis = [...allApis]
    } catch (error) {
      console.error("Error loading settings:", error)
      throw error
    }
  }

  // ===============================================
  // CONTENT POPULATION
  // ===============================================

  function populateContent() {
    if (!settings) return

    // Update page title
    document.title = settings.name || "Yeon UI"

    // Update sidebar
    if (elements.sidebarTitle) {
      elements.sidebarTitle.textContent = settings.name || "Yeon UI"
    }

    if (elements.sidebarVersion) {
      elements.sidebarVersion.textContent = settings.version || "v1.0.0"
    }

    // Update hero section
    if (elements.heroTitle) {
      elements.heroTitle.textContent = settings.name || "Yeon APIs Archive"
    }

    if (elements.heroDescription) {
      elements.heroDescription.textContent =
        settings.description ||
        "Experience the future of API documentation with beautiful gradients, smooth animations, and an intuitive interface designed for developers."
    }

    // Update hero image
    if (elements.heroImage && settings.bannerImage) {
      elements.heroImage.src = settings.bannerImage
      elements.heroImage.alt = `${settings.name} Banner`
    }

    // Update stats
    if (elements.totalAPIs) {
      elements.totalAPIs.textContent = `${allApis.length}+`
    }

    if (elements.totalCategories) {
      elements.totalCategories.textContent = settings.categories.length
    }

    // Update status
    if (elements.statusText && settings.header?.status) {
      elements.statusText.textContent = settings.header.status
    }
  }

  // ===============================================
  // CATEGORY RENDERING
  // ===============================================

  function renderCategories() {
    if (!elements.categoryFilter || !settings.categories) return

    // Clear existing categories (except "All")
    const allButton = elements.categoryFilter.querySelector('.category-btn[data-category="all"]')
    elements.categoryFilter.innerHTML = ""
    elements.categoryFilter.appendChild(allButton)

    // Add category buttons
    settings.categories.forEach((category) => {
      const button = document.createElement("button")
      button.className = "category-btn"
      button.dataset.category = category.name
      button.innerHTML = `
                <i class="${category.icon}"></i>
                ${category.name}
            `
      button.style.setProperty("--category-color", category.color)

      button.addEventListener("click", () => filterByCategory(category.name))
      elements.categoryFilter.appendChild(button)
    })
  }

  // ===============================================
  // API RENDERING
  // ===============================================

  function renderApis() {
    if (!elements.apiGrid) return

    elements.apiGrid.innerHTML = ""

    if (filteredApis.length === 0) {
      elements.noResults.style.display = "block"
      return
    }

    elements.noResults.style.display = "none"

    filteredApis.forEach((api, index) => {
      const card = createApiCard(api, index)
      elements.apiGrid.appendChild(card)
    })

    // Animate cards
    const cards = elements.apiGrid.querySelectorAll(".api-card")
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`
      card.classList.add("fadeInUp")
    })
  }

  function createApiCard(api, index) {
    const card = document.createElement("div")
    card.className = "api-card"
    card.dataset.name = api.name.toLowerCase()
    card.dataset.description = api.desc.toLowerCase()
    card.dataset.category = api.category

    card.innerHTML = `
            <div class="api-category" style="color: ${api.categoryColor}">
                <i class="${api.categoryIcon}"></i>
                ${api.category}
            </div>
            <h3 class="api-title">${api.name}</h3>
            <p class="api-description">${api.desc}</p>
            <div class="api-actions">
                <button class="try-btn" onclick="openApiModal(${index})">
                    <i class="fas fa-play"></i>
                    Try API
                </button>
                <div class="api-status status-${api.status}">
                    <i class="fas ${getStatusIcon(api.status)}"></i>
                    ${getStatusText(api.status)}
                </div>
            </div>
        `

    return card
  }

  function getStatusIcon(status) {
    switch (status) {
      case "ready":
        return "fa-check-circle"
      case "error":
        return "fa-exclamation-triangle"
      case "update":
        return "fa-sync-alt"
      default:
        return "fa-check-circle"
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "ready":
        return "Ready"
      case "error":
        return "Error"
      case "update":
        return "Updating"
      default:
        return "Ready"
    }
  }

  // ===============================================
  // MODAL HANDLING
  // ===============================================

  window.openApiModal = (index) => {
    const api = filteredApis[index]
    currentApiData = api

    // Populate modal
    elements.modalTitle.textContent = api.name
    elements.modalDescription.textContent = api.desc

    // Set endpoint
    const baseUrl = window.location.origin
    const endpoint = `${baseUrl}${api.path.split("?")[0]}`
    elements.endpointCode.textContent = endpoint

    // Handle parameters
    if (api.params && Object.keys(api.params).length > 0) {
      elements.parametersSection.style.display = "block"
      renderParameters(api.params)
    } else {
      elements.parametersSection.style.display = "none"
    }

    // Reset response section
    elements.responseSection.style.display = "none"
    elements.responseCode.style.display = "none"
    elements.loadingResponse.style.display = "none"

    // Show modal
    modalInstance.show()
  }

  function renderParameters(params) {
    elements.parametersContainer.innerHTML = ""

    Object.entries(params).forEach(([key, description]) => {
      const group = document.createElement("div")
      group.className = "parameter-group"

      group.innerHTML = `
                <label class="parameter-label">${key} <span style="color: var(--error-color);">*</span></label>
                <input type="text" class="parameter-input form-control" 
                       placeholder="${description}" 
                       data-param="${key}"
                       id="param-${key}">
                <small class="form-text text-muted">${description}</small>
            `

      elements.parametersContainer.appendChild(group)
    })
  }

  // ===============================================
  // API TESTING
  // ===============================================

  function testApi() {
    if (!currentApiData) return

    // Get parameters
    const params = new URLSearchParams()
    const inputs = elements.parametersContainer.querySelectorAll(".parameter-input")

    let hasErrors = false
    inputs.forEach((input) => {
      if (input.value.trim()) {
        params.append(input.dataset.param, input.value.trim())
      } else {
        input.classList.add("is-invalid")
        hasErrors = true
      }
    })

    if (hasErrors) {
      showToast("Please fill in all required parameters", "error")
      return
    }

    // Build URL
    const baseUrl = window.location.origin
    const apiUrl = `${baseUrl}${currentApiData.path.split("?")[0]}?${params.toString()}`

    // Update endpoint display
    elements.endpointCode.textContent = apiUrl

    // Show loading
    elements.responseSection.style.display = "block"
    elements.loadingResponse.style.display = "flex"
    elements.responseCode.style.display = "none"

    // Make request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        // Show response
        elements.loadingResponse.style.display = "none"
        elements.responseCode.style.display = "block"
        elements.responseCode.textContent = JSON.stringify(data, null, 2)

        // Apply syntax highlighting
        highlightJson(elements.responseCode)

        showToast("API request successful!", "success")
      })
      .catch((error) => {
        console.error("API request error:", error)
        elements.loadingResponse.style.display = "none"
        elements.responseCode.style.display = "block"
        elements.responseCode.textContent = `Error: ${error.message}`
        elements.responseCode.style.color = "var(--error-color)"

        showToast("API request failed", "error")
      })
  }

  function highlightJson(element) {
    let json = element.textContent

    // Highlight different parts
    json = json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "json-number"
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "json-key"
          } else {
            cls = "json-string"
          }
        } else if (/true|false/.test(match)) {
          cls = "json-boolean"
        } else if (/null/.test(match)) {
          cls = "json-null"
        }
        return '<span class="' + cls + '">' + match + "</span>"
      },
    )

    element.innerHTML = json
  }

  // ===============================================
  // SEARCH FUNCTIONALITY
  // ===============================================

  function handleSearch() {
    const query = elements.searchInput.value.toLowerCase().trim()

    if (query === "") {
      filteredApis =
        currentCategory === "all" ? [...allApis] : allApis.filter((api) => api.category === currentCategory)
    } else {
      const baseApis = currentCategory === "all" ? allApis : allApis.filter((api) => api.category === currentCategory)

      filteredApis = baseApis.filter(
        (api) =>
          api.name.toLowerCase().includes(query) ||
          api.desc.toLowerCase().includes(query) ||
          api.category.toLowerCase().includes(query),
      )
    }

    // Show/hide clear button
    elements.clearSearch.classList.toggle("visible", query.length > 0)

    renderApis()
  }

  function clearSearch() {
    elements.searchInput.value = ""
    elements.clearSearch.classList.remove("visible")
    handleSearch()
    elements.searchInput.focus()
  }

  // ===============================================
  // CATEGORY FILTERING
  // ===============================================

  function filterByCategory(category) {
    currentCategory = category

    // Update active button
    elements.categoryFilter.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.remove("active")
    })

    const activeBtn = elements.categoryFilter.querySelector(`[data-category="${category}"]`)
    if (activeBtn) {
      activeBtn.classList.add("active")
    }

    // Filter APIs
    if (category === "all") {
      filteredApis = [...allApis]
    } else {
      filteredApis = allApis.filter((api) => api.category === category)
    }

    // Apply search if active
    if (elements.searchInput.value.trim()) {
      handleSearch()
    } else {
      renderApis()
    }
  }

  // ===============================================
  // UTILITY FUNCTIONS
  // ===============================================

  function showToast(message, type = "info") {
    const toast = elements.notificationToast
    const toastBody = toast.querySelector(".toast-body")
    const toastIcon = toast.querySelector(".toast-icon")
    const toastTitle = toast.querySelector(".toast-title")

    // Set content
    toastBody.textContent = message

    // Set type
    const types = {
      success: { icon: "fa-check-circle", color: "var(--success-color)", title: "Success" },
      error: { icon: "fa-exclamation-circle", color: "var(--error-color)", title: "Error" },
      warning: { icon: "fa-exclamation-triangle", color: "var(--warning-color)", title: "Warning" },
      info: { icon: "fa-info-circle", color: "var(--primary-color)", title: "Info" },
    }

    const typeConfig = types[type] || types.info
    toastIcon.className = `toast-icon fas ${typeConfig.icon}`
    toastIcon.style.color = typeConfig.color
    toastTitle.textContent = typeConfig.title

    // Show toast
    toastInstance.show()
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast("Copied to clipboard!", "success")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        showToast("Failed to copy to clipboard", "error")
      })
  }

  function hideLoadingScreen() {
    if (elements.loadingScreen) {
      elements.loadingScreen.classList.add("fade-out")
      setTimeout(() => {
        elements.loadingScreen.style.display = "none"
        document.body.classList.remove("no-scroll")
      }, 500)
    }
  }

  // ===============================================
  // THEME MANAGEMENT
  // ===============================================

  function initializeTheme() {
    const savedTheme = localStorage.getItem("yeon-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute("data-theme", "dark")
      if (elements.themeToggle) {
        elements.themeToggle.checked = true
      }
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("yeon-theme", newTheme)

    showToast(`Switched to ${newTheme} theme`, "success")
  }

  // ===============================================
  // SIDEBAR MANAGEMENT
  // ===============================================

  function toggleSidebar() {
    elements.sidebar.classList.toggle("collapsed")
    localStorage.setItem("yeon-sidebar-collapsed", elements.sidebar.classList.contains("collapsed"))
  }

  function toggleMobileSidebar() {
    elements.sidebar.classList.toggle("active")
  }

  function initializeSidebar() {
    const isCollapsed = localStorage.getItem("yeon-sidebar-collapsed") === "true"
    if (isCollapsed) {
      elements.sidebar.classList.add("collapsed")
    }
  }

  // ===============================================
  // EVENT LISTENERS
  // ===============================================

  function setupEventListeners() {
    // Sidebar
    if (elements.sidebarToggle) {
      elements.sidebarToggle.addEventListener("click", toggleSidebar)
    }

    if (elements.mobileMenuToggle) {
      elements.mobileMenuToggle.addEventListener("click", toggleMobileSidebar)
    }

    // Theme
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener("change", toggleTheme)
    }

    // Search
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", debounce(handleSearch, 300))
    }

    if (elements.clearSearch) {
      elements.clearSearch.addEventListener("click", clearSearch)
    }

    // Modal
    if (elements.testBtn) {
      elements.testBtn.addEventListener("click", testApi)
    }

    if (elements.copyEndpoint) {
      elements.copyEndpoint.addEventListener("click", () => {
        copyToClipboard(elements.endpointCode.textContent)
      })
    }

    if (elements.copyResponse) {
      elements.copyResponse.addEventListener("click", () => {
        copyToClipboard(elements.responseCode.textContent)
      })
    }

    // Notifications
    if (elements.notificationBtn) {
      elements.notificationBtn.addEventListener("click", () => {
        showToast("No new notifications", "info")
        elements.notificationBadge.style.display = "none"
      })
    }

    // Navigation
    document.querySelectorAll(".nav-link[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.getElementById(link.dataset.section)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      })
    })

    // Close mobile sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 992 &&
        elements.sidebar.classList.contains("active") &&
        !elements.sidebar.contains(e.target) &&
        !elements.mobileMenuToggle.contains(e.target)
      ) {
        elements.sidebar.classList.remove("active")
      }
    })

    // Validate parameter inputs
    document.addEventListener("input", (e) => {
      if (e.target.classList.contains("parameter-input")) {
        e.target.classList.remove("is-invalid")
      }
    })
  }

  // ===============================================
  // UTILITY FUNCTIONS
  // ===============================================

  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // ===============================================
  // SCROLL EFFECTS
  // ===============================================

  function handleScroll() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    // Parallax effect for hero orbs
    document.querySelectorAll(".gradient-orb").forEach((orb, index) => {
      const speed = 0.2 + index * 0.1
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })

    // Update active navigation
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link[data-section]")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrolled >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.dataset.section === current) {
        link.classList.add("active")
      }
    })
  }

  // ===============================================
  // WINDOW EVENTS
  // ===============================================

  window.addEventListener("scroll", throttle(handleScroll, 16))

  window.addEventListener("resize", () => {
    // Close mobile sidebar on resize
    if (window.innerWidth > 992) {
      elements.sidebar.classList.remove("active")
    }
  })

  function throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // ===============================================
  // INITIALIZE APP
  // ===============================================

  // Initialize sidebar state
  initializeSidebar()

  // Start the application
  initialize()
})

// ===============================================
// GLOBAL FUNCTIONS
// ===============================================

// Make clearSearch available globally
window.clearSearch = () => {
  const searchInput = document.getElementById("searchInput")
  const clearBtn = document.getElementById("clearSearch")

  if (searchInput) {
    searchInput.value = ""
    searchInput.dispatchEvent(new Event("input"))
  }

  if (clearBtn) {
    clearBtn.classList.remove("visible")
  }
}

// Add loading screen animation
document.addEventListener("DOMContentLoaded", () => {
  // Add no-scroll class to body initially
  document.body.classList.add("no-scroll")

  // Simulate loading progress
  const progressBar = document.querySelector(".loading-progress")
  if (progressBar) {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      progressBar.style.width = progress + "%"
    }, 200)
  }
})
