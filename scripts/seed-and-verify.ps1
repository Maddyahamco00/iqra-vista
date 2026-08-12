# Seed and verify script for iqra-vista
# Run from repository root on Windows PowerShell

$ErrorActionPreference = 'Stop'

Write-Host "== Checking infra/docker and Docker Compose status =="
Push-Location "infra/docker"
try {
    Write-Host "Running: docker compose ps"
    docker compose ps
} catch {
    Write-Host "docker compose ps failed: $_"
}

# Start services if not up
# (This will try to start; remove if you don't want this script to start containers.)
try {
    $ps = docker compose ps --format json | Out-String
    if ($ps -match '"State":\s*"running"') {
        Write-Host "Some containers already running."
    } else {
        Write-Host "Bringing up docker compose services (detached)"
        docker compose up -d
        Start-Sleep -Seconds 3
        docker compose ps
    }
} catch {
    Write-Host "Unable to inspect or start docker compose services: $_"
}
Pop-Location

Write-Host "`n== Running Prisma seed in apps/api =="
Push-Location "apps/api"
try {
    Write-Host "Running: npx prisma db seed"
    npx prisma db seed
} catch {
    Write-Host "Prisma seed failed: $_"
    Pop-Location
    exit 1
}
Pop-Location

Write-Host "`n== Verifying database rows via docker exec =="
# Lessons count
try {
    Write-Host "Lessons count:"
    docker exec iqra-postgres psql -U postgres -d iqra_vista -c "SELECT COUNT(*) FROM lessons;"
} catch {
    Write-Host "Failed to query lessons: $_"
}

# Users list
try {
    Write-Host "Users (email, role):"
    docker exec iqra-postgres psql -U postgres -d iqra_vista -c "SELECT email, role FROM users;"
} catch {
    Write-Host "Failed to query users: $_"
}

# Student linked to parent
try {
    Write-Host "Student linked to parent:"
    docker exec iqra-postgres psql -U postgres -d iqra_vista -c "SELECT s.id, u.name, s.current_level, p.user_id as parent_id FROM students s JOIN users u ON s.user_id = u.id;"
} catch {
    Write-Host "Failed to query students: $_"
}

# Parents and admins counts
try {
    Write-Host "Parents count:"
    docker exec iqra-postgres psql -U postgres -d iqra_vista -c "SELECT COUNT(*) FROM parents;"
} catch {
    Write-Host "Failed to query parents: $_"
}
try {
    Write-Host "Admins count:"
    docker exec iqra-postgres psql -U postgres -d iqra_vista -c "SELECT COUNT(*) FROM admins;"
} catch {
    Write-Host "Failed to query admins: $_"
}

Write-Host "`n== Done. Review the outputs above for acceptance criteria."
Write-Host "If anything failed, paste the error output here and I'll help troubleshoot."
