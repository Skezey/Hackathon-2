class Api::ReviewsController < ApplicationController
  before_action :set_product
  def index
    render json: @product.reviews
  end

  def show
    @review = @products.reviews.find(params[:id])
    render json: @review
  end

  def create
    @review = @product.reviews.new(review_params)
    if @review.save
      render json: @review
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  def update
    @review = @product.reviews.find(params[:id])
    if @review.update(review_params)
      render json: @review
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @department.reviews.find(params[:id]).destroy
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
