from typing import List, Dict, Any
from app.database import db_instance, in_memory_roadmaps, in_memory_completion_events
from app.schemas.roadmap import RoadmapOut, RoadmapNode, RoadmapResource
import datetime

# Helper to build comprehensive domain-specific tree roadmaps
def build_default_roadmap(user_id: str, target_role: str = "Full Stack Engineer", domain: str = "Full-Stack Software Engineering") -> Dict[str, Any]:
    roadmap_id = f"rm_{user_id}_{target_role.lower().replace(' ', '_')}"
    
    nodes = [
        # Root Goal
        {
            "nodeId": "root_goal",
            "title": f"Target Career: {target_role}",
            "description": f"Master competencies and build verified project evidence to land a {target_role} position.",
            "type": "career_goal",
            "parentId": None,
            "prerequisiteNodeIds": [],
            "relatedSkillIds": ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Tailwind CSS"],
            "status": "available",
            "completedAt": None,
            "resources": [],
            "completionCriteria": "Complete all foundational phases, core projects, and final readiness assessment.",
            "estimatedHours": 120,
            "provenance": "verified"
        },

        # Phase 1: Core Web & Language Fundamentals
        {
            "nodeId": "phase_1",
            "title": "Phase 1: Web & Language Fundamentals",
            "description": "Master core HTML5, CSS3, modern ES6+ JavaScript, and TypeScript type systems.",
            "type": "phase",
            "parentId": "root_goal",
            "prerequisiteNodeIds": [],
            "relatedSkillIds": ["HTML5", "CSS3", "JavaScript", "TypeScript"],
            "status": "in_progress",
            "completedAt": None,
            "resources": [],
            "completionCriteria": "Pass JavaScript & TypeScript practical coding exercises.",
            "estimatedHours": 30,
            "provenance": "verified"
        },
        {
            "nodeId": "task_1_1",
            "title": "ES6+ Modern JavaScript Mastery",
            "description": "Learn Promises, Async/Await, ES Modules, Destructuring, and Functional Array Methods.",
            "type": "task",
            "parentId": "phase_1",
            "prerequisiteNodeIds": [],
            "relatedSkillIds": ["JavaScript"],
            "status": "completed",
            "completedAt": "2026-10-09T10:00:00Z",
            "resources": [
              {"title": "MDN JavaScript Guide", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "type": "Documentation", "provider": "Mozilla", "isVerified": True},
              {"title": "javascript.info Modern JS", "url": "https://javascript.info/", "type": "Interactive Book", "provider": "JSInfo", "isVerified": True}
            ],
            "completionCriteria": "Write asynchronous data fetchers with error handling.",
            "estimatedHours": 8,
            "provenance": "verified"
        },
        {
            "nodeId": "task_1_2",
            "title": "TypeScript Strict Compiler & Interface Design",
            "description": "Define strict interfaces, generics, union types, and type guards.",
            "type": "task",
            "parentId": "phase_1",
            "prerequisiteNodeIds": ["task_1_1"],
            "relatedSkillIds": ["TypeScript"],
            "status": "in_progress",
            "completedAt": None,
            "resources": [
              {"title": "Official TypeScript Documentation", "url": "https://www.typescriptlang.org/docs/", "type": "Official Docs", "provider": "Microsoft", "isVerified": True}
            ],
            "completionCriteria": "Convert plain JS modules into strictly-typed TS modules without using 'any'.",
            "estimatedHours": 10,
            "provenance": "verified"
        },

        # Phase 2: Modern Frontend & Dynamic UI
        {
            "nodeId": "phase_2",
            "title": "Phase 2: Modern Frontend & Dynamic UI Systems",
            "description": "Build interactive single-page web apps with React 18, Tailwind CSS, GSAP, and Framer Motion.",
            "type": "phase",
            "parentId": "root_goal",
            "prerequisiteNodeIds": ["phase_1"],
            "relatedSkillIds": ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
            "status": "available",
            "completedAt": None,
            "resources": [],
            "completionCriteria": "Build responsive interactive frontend application with state management.",
            "estimatedHours": 35,
            "provenance": "verified"
        },
        {
            "nodeId": "task_2_1",
            "title": "React Component Architecture & Hooks",
            "description": "Implement useState, useEffect, useMemo, custom hooks, and context state.",
            "type": "task",
            "parentId": "phase_2",
            "prerequisiteNodeIds": ["task_1_2"],
            "relatedSkillIds": ["React"],
            "status": "available",
            "completedAt": None,
            "resources": [
              {"title": "React Official Docs", "url": "https://react.dev/", "type": "Official Docs", "provider": "Meta", "isVerified": True}
            ],
            "completionCriteria": "Build modular React UI components using custom hooks for state.",
            "estimatedHours": 12,
            "provenance": "verified"
        },
        {
            "nodeId": "task_2_2",
            "title": "Tailwind CSS Design Systems & Cinematic Styling",
            "description": "Configure design tokens, dark ocean palettes, responsive utility classes, and glassmorphism.",
            "type": "task",
            "parentId": "phase_2",
            "prerequisiteNodeIds": ["task_2_1"],
            "relatedSkillIds": ["Tailwind CSS"],
            "status": "available",
            "completedAt": None,
            "resources": [
              {"title": "Tailwind CSS Documentation", "url": "https://tailwindcss.com/docs", "type": "Official Docs", "provider": "Tailwind Labs", "isVerified": True}
            ],
            "completionCriteria": "Stylize complete dashboard UI using Tailwind CSS utility tokens.",
            "estimatedHours": 8,
            "provenance": "verified"
        },
        {
            "nodeId": "task_2_3",
            "title": "GSAP ScrollTrigger & Framer Motion Animations",
            "description": "Implement scroll-driven animations, steering-wheel scroll triggers, and expandable tree node transitions.",
            "type": "task",
            "parentId": "phase_2",
            "prerequisiteNodeIds": ["task_2_2"],
            "relatedSkillIds": ["GSAP", "Framer Motion"],
            "status": "locked",
            "completedAt": None,
            "resources": [
              {"title": "GSAP ScrollTrigger Docs", "url": "https://gsap.com/docs/v3/Plugins/ScrollTrigger/", "type": "Docs", "provider": "GreenSock", "isVerified": True},
              {"title": "Framer Motion Guide", "url": "https://www.framer.com/motion/", "type": "Docs", "provider": "Framer", "isVerified": True}
            ],
            "completionCriteria": "Create smooth 60fps scroll triggers and node expansion transitions.",
            "estimatedHours": 10,
            "provenance": "verified"
        },

        # Phase 3: Backend APIs & Persistent Data
        {
            "nodeId": "phase_3",
            "title": "Phase 3: Backend APIs & Persistent Data Systems",
            "description": "Design RESTful APIs, JWT auth tokens, MongoDB/Mongoose models, and Zod validation.",
            "type": "phase",
            "parentId": "root_goal",
            "prerequisiteNodeIds": ["phase_1"],
            "relatedSkillIds": ["Node.js", "Express", "MongoDB", "JWT", "REST APIs"],
            "status": "available",
            "completedAt": None,
            "resources": [],
            "completionCriteria": "Deploy functional REST API with authentication and MongoDB persistence.",
            "estimatedHours": 40,
            "provenance": "verified"
        },
        {
            "nodeId": "task_3_1",
            "title": "Express/FastAPI REST API & Router Architecture",
            "description": "Build versioned endpoints, error handling middlewares, and request schemas.",
            "type": "task",
            "parentId": "phase_3",
            "prerequisiteNodeIds": ["task_1_2"],
            "relatedSkillIds": ["Node.js", "Express", "REST APIs"],
            "status": "available",
            "completedAt": None,
            "resources": [
              {"title": "FastAPI Documentation", "url": "https://fastapi.tiangolo.com/", "type": "Official Docs", "provider": "FastAPI", "isVerified": True}
            ],
            "completionCriteria": "Implement authenticated REST CRUD endpoints.",
            "estimatedHours": 12,
            "provenance": "verified"
        },
        {
            "nodeId": "task_3_2",
            "title": "MongoDB Document Modeling & Prerequisite Validation",
            "description": "Create schemas for users, profiles, tree roadmaps, and node completion events.",
            "type": "task",
            "parentId": "phase_3",
            "prerequisiteNodeIds": ["task_3_1"],
            "relatedSkillIds": ["MongoDB", "Mongoose"],
            "status": "locked",
            "completedAt": None,
            "resources": [
              {"title": "MongoDB Manual", "url": "https://www.mongodb.com/docs/manual/", "type": "Docs", "provider": "MongoDB", "isVerified": True}
            ],
            "completionCriteria": "Implement MongoDB schema validation and prerequisite state updates.",
            "estimatedHours": 14,
            "provenance": "verified"
        },

        # Milestone: Portfolio Capstone Readiness
        {
            "nodeId": "milestone_ready",
            "title": "Final Milestone: Career Readiness Capstone",
            "description": "Complete end-to-end full stack project integration, test suites, and job discovery matching.",
            "type": "milestone",
            "parentId": "root_goal",
            "prerequisiteNodeIds": ["task_2_3", "task_3_2"],
            "relatedSkillIds": ["Full Stack Integration", "Testing", "Deployment"],
            "status": "locked",
            "completedAt": None,
            "resources": [],
            "completionCriteria": "Execute unit tests and publish live project deployment.",
            "estimatedHours": 15,
            "provenance": "verified"
        }
    ]

    # Calculate overall progress
    total_tasks = sum(1 for n in nodes if n["type"] in ["task", "project", "assessment"])
    completed_tasks = sum(1 for n in nodes if n["type"] in ["task", "project", "assessment"] and n["status"] == "completed")
    progress = round((completed_tasks / max(total_tasks, 1)) * 100, 1)

    return {
        "roadmapId": roadmap_id,
        "userId": user_id,
        "targetRole": target_role,
        "domain": domain,
        "overallProgress": progress,
        "version": 1,
        "nodes": nodes
    }

async def get_or_create_roadmap(user_id: str, target_role: str = "Full Stack Engineer", domain: str = "Full-Stack Software Engineering") -> Dict[str, Any]:
    if db_instance.is_connected:
        doc = await db_instance.db.roadmaps.find_one({"userId": user_id})
        if doc:
            doc.pop("_id", None)
            return doc
        
        # Create new
        new_data = build_default_roadmap(user_id, target_role, domain)
        await db_instance.db.roadmaps.insert_one(new_data)
        new_data.pop("_id", None)
        return new_data
    else:
        if user_id not in in_memory_roadmaps:
            in_memory_roadmaps[user_id] = build_default_roadmap(user_id, target_role, domain)
        return in_memory_roadmaps[user_id]

async def complete_roadmap_node(user_id: str, roadmap_id: str, node_id: str, evidence_summary: str = "") -> Dict[str, Any]:
    roadmap = await get_or_create_roadmap(user_id)
    
    # Find target node
    nodes = roadmap["nodes"]
    target_node = next((n for n in nodes if n["nodeId"] == node_id), None)
    
    if not target_node:
        raise ValueError(f"Node '{node_id}' not found in roadmap.")

    # 1. Check prerequisites enforcement!
    prereqs = target_node.get("prerequisiteNodeIds", [])
    incomplete_prereqs = []
    for p_id in prereqs:
        p_node = next((n for n in nodes if n["nodeId"] == p_id), None)
        if p_node and p_node["status"] != "completed":
            incomplete_prereqs.append(p_node["title"])

    if incomplete_prereqs:
        raise ValueError(f"Cannot complete task '{target_node['title']}'. Prerequisite tasks are incomplete: {', '.join(incomplete_prereqs)}")

    # 2. Update status
    target_node["status"] = "completed"
    target_node["completedAt"] = datetime.datetime.now(datetime.timezone.utc).isoformat()

    # 3. Unlock dependent nodes whose prerequisites are now satisfied!
    for n in nodes:
        if n["status"] in ["locked", "available"]:
            n_prereqs = n.get("prerequisiteNodeIds", [])
            if n_prereqs:
                all_done = all(
                    next((x for x in nodes if x["nodeId"] == pid and x["status"] == "completed"), None) is not None
                    for pid in n_prereqs
                )
                if all_done:
                    n["status"] = "available"

    # 4. Update parent phase status & overall progress
    total_tasks = sum(1 for n in nodes if n["type"] in ["task", "project", "assessment"])
    completed_tasks = sum(1 for n in nodes if n["type"] in ["task", "project", "assessment"] and n["status"] == "completed")
    overall_progress = round((completed_tasks / max(total_tasks, 1)) * 100, 1)
    roadmap["overallProgress"] = overall_progress

    # Update phase status
    for n in nodes:
        if n["type"] == "phase":
            child_tasks = [c for c in nodes if c["parentId"] == n["nodeId"]]
            if child_tasks:
                if all(c["status"] == "completed" for c in child_tasks):
                    n["status"] = "completed"
                    n["completedAt"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
                elif any(c["status"] in ["completed", "in_progress"] for c in child_tasks):
                    n["status"] = "in_progress"

    # Persist update
    if db_instance.is_connected:
        await db_instance.db.roadmaps.update_one({"roadmapId": roadmap_id}, {"$set": roadmap})
        await db_instance.db.completion_events.insert_one({
            "roadmapId": roadmap_id,
            "nodeId": node_id,
            "userId": user_id,
            "completedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "evidenceSummary": evidence_summary or "Task marked as complete",
            "provenance": "user_provided"
        })
    else:
        in_memory_roadmaps[user_id] = roadmap
        in_memory_completion_events.append({
            "roadmapId": roadmap_id,
            "nodeId": node_id,
            "userId": user_id,
            "completedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "evidenceSummary": evidence_summary or "Task marked as complete",
            "provenance": "user_provided"
        })

    return {
        "success": True,
        "message": f"Successfully completed task '{target_node['title']}'!",
        "completedNodeId": node_id,
        "newStatus": "completed",
        "overallProgress": overall_progress,
        "updatedRoadmap": roadmap
    }
