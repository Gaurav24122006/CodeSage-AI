from fastapi import APIRouter

from app.schemas.review import ReviewRequest
from app.services.review_service import review_service

router = APIRouter(prefix="/review", tags=["Review"])


@router.post("/")
async def review_code(request: ReviewRequest):
    result = review_service.review_code(
        code=request.code,
        language=request.language,
    )

    return result