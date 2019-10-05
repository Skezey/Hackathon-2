class Api::ReviewsController < ApplicationController
  before_action :set_product
  def index
    render json: Review.all
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render json: @review
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render json: @review
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Review.find(params[:id]).destroy
    render json: { message: 'Review deleted'}
  end

  private
    def review_params
      params.require(:review).permit(:subject, :body, :stars, :date)
    end

    def set_product
      @product = Product.find(params[:product_id])
    end
end
